<template>
  <div class="city-scatter-bar">
    <v-card>
      <v-card-title class="text-subtitle-1 mb-2 d-flex justify-space-between align-center text-mediumBlue">
        <span>100 Indian Cities</span>
        <div class="d-flex align-center">
          <v-btn
            @click="toggleView"
            color="primary"
            variant="outlined"
            size="small"
            :disabled="loading"
            class="mr-2"
          >
            <v-icon left>{{ currentView === 'scatter' ? 'mdi-chart-bar' : 'mdi-map-marker' }}</v-icon>
            {{ currentView === 'scatter' ? 'Show Bars' : 'Show Map' }}
          </v-btn>
          <v-btn
            @click="reloadVisualization"
            color="primary"
            variant="outlined"
            size="small"
            :disabled="loading"
          >
            <v-icon left>mdi-refresh</v-icon>
            Reload
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="py-0">
        <div v-if="loading" class="text-center pa-8">
          <ProgressLoader
            type="linear"
            :progress="progress"
            :indeterminate="false"
            title="Creating City Visualization"
            message="Loading city data and generating visualization..."
            icon="mdi-chart-scatter-plot"
            color="primary"
            :current-step="currentStep"
            :total-steps="totalSteps"
            :steps="steps"
          />
        </div>
        <div v-else-if="error" class="text-center pa-8">
          <v-alert type="error" variant="tonal">
            {{ error }}
          </v-alert>
        </div>
        <div v-else class="chart-container">
          <v-chart 
            class="chart" 
            :option="chartOption" 
            :loading="loading"
            autoresize
            @click="handleCityClick"
          />
        </div>
      </v-card-text>
    </v-card>
    <p class="text-caption mt-5 text-center flash-text" style="color: #555555;">
      ↑ Click City to View Details ↑ 
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart, BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import ProgressLoader from '@/components/UI/ProgressLoader.vue'
import { useAppStore } from '@/stores/app.js'

// Register ECharts components
use([
  CanvasRenderer,
  ScatterChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent,
  DataZoomComponent
])

// Store
const appStore = useAppStore()

// Reactive data
const cityData = ref([])
const loading = ref(true)
const error = ref(null)
const progress = ref(0)
const currentStep = ref(0)
const totalSteps = ref(3)
const steps = ref([
  { label: 'Load City Locations', completed: false, active: false },
  { label: 'Load City Data', completed: false, active: false },
  { label: 'Generate Visualization', completed: false, active: false }
])
const currentView = ref('scatter') // 'scatter' or 'bar'

// Configuration
const LOCATION_URL = 'https://raw.githubusercontent.com/chuanlongZhou/indian_100_data/refs/heads/main/data/city/city_index.geojson'
const SHARE_URL = 'https://raw.githubusercontent.com/chuanlongZhou/indian_100_data/refs/heads/main/data/city/city_share.csv'

/**
 * Handle city click events
 */
const handleCityClick = (params) => {
  console.log('Chart clicked!', params)
  if (params && params.name) {
    const cityName = params.name
    console.log('City clicked:', cityName)
    appStore.addSelectedCity(cityName)
  } else {
    console.log('Click event received but no city name found:', params)
  }
}

/**
 * Fetch and parse CSV data
 */
const fetchCSV = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${response.status}`)
  }
  const text = await response.text()
  const lines = text.split('\n')
  const headers = lines[0].split(',')
  const data = []
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',')
      const row = {}
      headers.forEach((header, index) => {
        row[header.trim()] = values[index] ? values[index].trim() : ''
      })
      data.push(row)
    }
  }
  
  return data
}

/**
 * Load city location data from GeoJSON
 */
const loadCityLocations = async () => {
  console.log('Loading city locations...')
  const response = await fetch(LOCATION_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch location data: ${response.status}`)
  }
  
  const geojson = await response.json()
  const locations = {}
  
  geojson.features.forEach(feature => {
    const props = feature.properties
    const coords = feature.geometry.coordinates
    
    locations[props.city_name] = {
      longitude: coords[0],
      latitude: coords[1],
      population: props.population_2020,
      province: props.province,
      region: props.region
    }
  })
  
  return locations
}

/**
 * Load city share data from CSV
 */
const loadCityShareData = async () => {
  console.log('Loading city share data...')
  const csvData = await fetchCSV(SHARE_URL)
  const shareData = {}
  
  csvData.forEach(row => {
    if (row.city && row.total && row.population_2020) {
      shareData[row.city] = {
        total: parseFloat(row.total) || 0,
        power: parseFloat(row.power) || 0,
        traffic: parseFloat(row.traffic) || 0,
        residential_scope1: parseFloat(row.residential_scope1) || 0,
        residential_scope2: parseFloat(row.residential_scope2) || 0,
        industrial: parseFloat(row.industrial) || 0,
        aviation: parseFloat(row.aviation) || 0,
        population_2020: parseFloat(row.population_2020) || 0
      }
    }
  })
  
  return shareData
}

/**
 * Combine location and share data
 */
const combineCityData = (locations, shareData) => {
  const combinedData = []
  
  Object.keys(locations).forEach(cityName => {
    const location = locations[cityName]
    const share = shareData[cityName] || {}
    
    if (location && share.total !== undefined) {
      combinedData.push({
        name: cityName,
        longitude: location.longitude,
        latitude: location.latitude,
        population: location.population / 1000000, // Convert to millions
        total: (share.total || 0) / 1000, // Convert kt to Mt
        power: (share.power || 0) / 1000, // Convert kt to Mt
        traffic: (share.traffic || 0) / 1000, // Convert kt to Mt
        residential_scope1: (share.residential_scope1 || 0) / 1000, // Convert kt to Mt
        residential_scope2: (share.residential_scope2 || 0) / 1000, // Convert kt to Mt
        industrial: (share.industrial || 0) / 1000, // Convert kt to Mt
        aviation: (share.aviation || 0) / 1000, // Convert kt to Mt
        province: location.province,
        region: location.region
      })
    }
  })
  
  return combinedData
}

/**
 * Fetch all city data
 */
const fetchCityData = async () => {
  try {
    loading.value = true
    error.value = null
    progress.value = 0
    currentStep.value = 0
    
    // Initialize steps
    steps.value.forEach((step, index) => {
      step.completed = false
      step.active = index === 0
    })
    
    // Step 1: Load City Locations
    console.log('Step 1: Loading city locations...')
    steps.value[0].active = true
    progress.value = 10
    
    const locations = await loadCityLocations()
    
    steps.value[0].completed = true
    steps.value[0].active = false
    currentStep.value = 1
    progress.value = 30
    
    // Step 2: Load City Share Data
    console.log('Step 2: Loading city share data...')
    steps.value[1].active = true
    progress.value = 40
    
    const shareData = await loadCityShareData()
    
    steps.value[1].completed = true
    steps.value[1].active = false
    currentStep.value = 2
    progress.value = 60
    
    // Step 3: Combine and Generate Visualization
    console.log('Step 3: Combining data and generating visualization...')
    steps.value[2].active = true
    progress.value = 70
    
    cityData.value = combineCityData(locations, shareData)
    
    // Simulate processing time for visual feedback
    await new Promise(resolve => setTimeout(resolve, 500))
    
    steps.value[2].completed = true
    steps.value[2].active = false
    currentStep.value = 3
    progress.value = 100
    
    console.log(`Loaded ${cityData.value.length} cities with complete data`)
    
  } catch (err) {
    console.error('Error fetching city data:', err)
    error.value = `Failed to load city data: ${err.message}`
  } finally {
    loading.value = false
  }
}

/**
 * Toggle between scatter and bar view
 */
const toggleView = () => {
  currentView.value = currentView.value === 'scatter' ? 'bar' : 'scatter'
}

/**
 * Reload the visualization
 */
const reloadVisualization = () => {
  // Clear selected cities when reloading
  appStore.clearSelectedCities()
  console.log('Reloading visualization - selected cities cleared')
  fetchCityData()
}

/**
 * Computed chart option for ECharts
 */
const chartOption = computed(() => {
  if (!cityData.value.length) return {}
  
  if (currentView.value === 'scatter') {
    return getScatterOption()
  } else {
    return getBarOption()
  }
})

/**
 * Generate scatter plot option
 */
const getScatterOption = () => {
  const populations = cityData.value.map(city => city.population)
  const minPop = Math.min(...populations)
  const maxPop = Math.max(...populations)
  
  const getSize = (population) => {
    return 8 + (population - minPop) / (maxPop - minPop) * 32
  }
  
  // Console log scatter plot data
  console.log('Scatter Plot Data Series:', cityData.value.map(city => ({
    name: city.name,
    value: [city.longitude, city.latitude, city.population],
    symbolSize: getSize(city.population),
    population: city.population,
    total: city.total,
    power: city.power,
    traffic: city.traffic,
    residential_scope1: city.residential_scope1,
    residential_scope2: city.residential_scope2,
    industrial: city.industrial,
    aviation: city.aviation
  })))
  
  return {
    title: {
      text: '',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        const city = params.data
        return `
          <div style="padding: 8px;">
            <h4 style="margin: 0 0 8px 0; color: #333;">${city.name}</h4>
            <p style="margin: 4px 0;"><strong>Province:</strong> ${city.province}</p>
            <p style="margin: 4px 0;"><strong>Population:</strong> ${city.population.toFixed(2)} million</p>
            <p style="margin: 4px 0;"><strong>Total Emissions:</strong> ${city.total.toFixed(2)} Mt</p>
            <p style="margin: 4px 0;"><strong>Power:</strong> ${city.power.toFixed(2)} Mt</p>
            <p style="margin: 4px 0;"><strong>Traffic:</strong> ${city.traffic.toFixed(2)} Mt</p>
            <p style="margin: 4px 0;"><strong>Residential Scope 1:</strong> ${city.residential_scope1.toFixed(2)} Mt</p>
            <p style="margin: 4px 0;"><strong>Residential Scope 2:</strong> ${city.residential_scope2.toFixed(2)} Mt</p>
            <p style="margin: 4px 0;"><strong>Industrial:</strong> ${city.industrial.toFixed(2)} Mt</p>
            <p style="margin: 4px 0;"><strong>Aviation:</strong> ${city.aviation.toFixed(2)} Mt</p>
          </div>
        `
      }
    },
    visualMap: {
      type: 'continuous',
      min: minPop,
      max: maxPop,
      right: '5%',
      bottom: '5%',
      text: ['High Population (millions)', 'Low Population (millions)'],
      calculable: true,
      inRange: {
        color: ['#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#fee090', '#fdae61', '#f46d43', '#d73027']
      },
      textStyle: {
        color: '#333'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '5%',
      bottom: '10%'
    },
    xAxis: {
      type: 'value',
      name: 'Longitude',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: {
        formatter: '{value}°E'
      },
      min: 70,
      max: 95,
      show: false
    },
    yAxis: {
      type: 'value',
      name: 'Latitude',
      nameLocation: 'middle',
      nameGap: 40,
      axisLabel: {
        formatter: '{value}°N'
      },
      min: 5,
      max: 35,
      show: false
    },
    series: [
      {
        name: 'Cities',
        type: 'scatter',
        id: 'cities',
        data: cityData.value.map(city => ({
          ...city,
          value: [city.longitude, city.latitude, city.population],
          symbolSize: getSize(city.population)
        })),
        itemStyle: {
          opacity: 0.8,
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            opacity: 1,
            borderColor: '#3878C3',
            borderWidth: 2,
            shadowBlur: 12,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        },
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        universalTransition: true,
        // animationDelay: function (idx) {
        //   return idx * 30
        // }
      }
    ]
  }
}

/**
 * Generate bar chart option
 */
const getBarOption = () => {
  // Sort cities by total emissions for better visualization (highest first)
  const sortedData = [...cityData.value].sort((a, b) => b.total - a.total).slice(0, 30)
  
  // Console log bar chart data
  console.log('Bar Chart Data Series:', sortedData.map(city => ({
    name: city.name,
    total: city.total,
    population: city.population,
    power: city.power,
    traffic: city.traffic,
    residential_scope1: city.residential_scope1,
    residential_scope2: city.residential_scope2,
    industrial: city.industrial,
    aviation: city.aviation
  })))  
  return {
    title: {
      text: '',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#ccc',
      borderWidth: 1,
      textStyle: {
        color: '#333'
      },
            formatter: function (params) {
        const cityName = params.name
        const cityData = sortedData.find(c => c.name === cityName)
        
        if (!cityData) {
          return `<div style="padding: 8px;"><p>City: ${cityName}</p></div>`
        }
        
        // Calculate total from stacked values, ignoring NaN values
        const total = [cityData.power, cityData.traffic, cityData.residential_scope1, 
                      cityData.industrial, cityData.aviation]
          .filter(value => !isNaN(value) && value !== null && value !== undefined)
          .reduce((sum, value) => sum + value, 0)
        
        return `
          <div style="padding: 12px; min-width: 250px;">
            <h4 style="margin: 0 0 10px 0; color: #333; font-size: 16px; font-weight: bold;">
              ${cityName}
            </h4>
            <div style="border-top: 1px solid #eee; padding-top: 8px;">
              <p style="margin: 6px 0; font-size: 14px;">
                <strong style="color: #d73027;">Total Emissions:</strong> 
                <span style="color: #333;">${total.toFixed(2)} Mt</span>
              </p>
              <p style="margin: 6px 0; font-size: 14px;">
                <strong style="color: #666;">Population:</strong> 
                <span style="color: #333;">${cityData.population.toFixed(2)} million</span>
              </p>
              <p style="margin: 6px 0; font-size: 14px;">
                <strong style="color: #FBC02D;">Power:</strong> 
                <span style="color: #333;">${cityData.power.toFixed(2)} Mt</span>
              </p>
              <p style="margin: 6px 0; font-size: 14px;">
                <strong style="color: #43A047;">Traffic:</strong> 
                <span style="color: #333;">${cityData.traffic.toFixed(2)} Mt</span>
              </p>
              <p style="margin: 6px 0; font-size: 14px;">
                <strong style="color: #9575CD;">Residential Scope 1:</strong> 
                <span style="color: #333;">${cityData.residential_scope1.toFixed(2)} Mt</span>
              </p>
              <p style="margin: 6px 0; font-size: 14px;">
                <strong style="color: #90A4AE;">Industrial:</strong> 
                <span style="color: #333;">${cityData.industrial.toFixed(2)} Mt</span>
              </p>
              <p style="margin: 6px 0; font-size: 14px;">
                <strong style="color: #00796B;">Aviation:</strong> 
                <span style="color: #333;">${cityData.aviation.toFixed(2)} Mt</span>
              </p>
            </div>
          </div>
        `
      }
    },
    legend: [
      {
        data: ['Power', 'Traffic', 'Residential Scope 1'],
        right: '5%',
        bottom: '8%',
        orient: 'horizontal',
        textStyle: {
          fontSize: 11
        },
        itemGap: 20,
        itemWidth: 15,
        itemHeight: 10
      },
      {
        data: ['Industrial', 'Aviation'],
        right: '5%',
        bottom: '5%',
        orient: 'horizontal',
        textStyle: {
          fontSize: 11
        },
        itemGap: 20,
        itemWidth: 15,
        itemHeight: 10
      }
    ],
    grid: {
      left: '3%',
      right: '3%',
      bottom: '15%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: 'Emissions'
    },
    yAxis: {
      type: 'category',
      data: sortedData.map(city => city.name).reverse(),
      axisLabel: {
        fontSize: 10
      }
    },
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     start: 0,
    //     end: 100
    //   },
    //   {
    //     type: 'slider',
    //     start: 0,
    //     end: 100
    //   }
    // ],
    series: [
      {
        name: 'Power',
        type: 'bar',
        stack: 'total',
        data: sortedData.map(city => city.power).reverse(),
        itemStyle: {
          color: '#FBC02D'
        },
        emphasis: {
          itemStyle: {
            color: '#F57F17'
          }
        }
      },
      {
        name: 'Traffic',
        type: 'bar',
        stack: 'total',
        data: sortedData.map(city => city.traffic).reverse(),
        itemStyle: {
          color: '#43A047'
        },
        emphasis: {
          itemStyle: {
            color: '#2E7D32'
          }
        }
      },
      {
        name: 'Residential Scope 1',
        type: 'bar',
        stack: 'total',
        data: sortedData.map(city => city.residential_scope1).reverse(),
        itemStyle: {
          color: '#9575CD'
        },
        emphasis: {
          itemStyle: {
            color: '#7B1FA2'
          }
        }
      },

      {
        name: 'Industrial',
        type: 'bar',
        stack: 'total',
        data: sortedData.map(city => city.industrial).reverse(),
        itemStyle: {
          color: '#90A4AE'
        },
        emphasis: {
          itemStyle: {
            color: '#546E7A'
          }
        }
      },
      {
        name: 'Aviation',
        type: 'bar',
        stack: 'total',
        data: sortedData.map(city => city.aviation).reverse(),
        itemStyle: {
          color: '#00796B'
        },
        emphasis: {
          itemStyle: {
            color: '#004D40'
          }
        }
      }
    ],
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    universalTransition: true
  }
}

// Lifecycle
onMounted(() => {
  if (steps.value.length > 0) {
    steps.value[0].active = true
  }
  fetchCityData()
})
</script>

<style scoped>
.city-scatter-bar {
  width: 100%;
  height: 100%;
}

.chart-container {
  width: 100%;
  height: 600px;
  position: relative;
}

.chart {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .chart-container {
    height: 400px;
  }
}

@keyframes flash {
  0%, 50%, 100% {
    opacity: 1;
    color: #8b8b8b;
  }
  25%, 75% {
    opacity: 1;
    color: #2f2f2f;
  }
}

.flash-text {
  animation: flash 3s ease-in-out infinite;
  font-weight: 500;
}
</style> 