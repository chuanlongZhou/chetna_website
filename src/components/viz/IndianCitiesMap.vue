<template>
  <div class="indian-cities-map">
    <v-card class="pa-4">
      <v-card-title class="text-h5 mb-4 d-flex justify-space-between align-center">
        <span>Indian Cities Population Distribution</span>
        <v-btn
          @click="reloadVisualization"
          color="primary"
          variant="outlined"
          size="small"
          :disabled="loading"
          class="ml-4"
        >
          <v-icon left>mdi-refresh</v-icon>
          Reload
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div v-if="loading" class="text-center pa-8">
          <ProgressLoader
            type="linear"
            :progress="progress"
            :indeterminate="false"
            title="Creating Indian Cities Map"
            message="Loading city data and generating visualization..."
            icon="mdi-map-marker"
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
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import ProgressLoader from '@/components/UI/ProgressLoader.vue'

// Register ECharts components
use([
  CanvasRenderer,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent
])

// Reactive data
const cityData = ref([])
const loading = ref(true)
const error = ref(null)
const progress = ref(0)
const currentStep = ref(0)
const totalSteps = ref(2)
const steps = ref([
  { label: 'Fetch Data', completed: false, active: false },
  { label: 'Generate Plot', completed: false, active: false }
])

// Configuration
const DATA_URL = 'https://raw.githubusercontent.com/chuanlongZhou/indian_100_data/refs/heads/main/data/city/city_index.geojson'

/**
 * Fetch city data from the GeoJSON URL
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
    
    // Step 1: Fetch Data
    console.log('Step 1: Fetching city data...')
    steps.value[0].active = true
    progress.value = 10
    
    const response = await fetch(DATA_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`)
    }
    
    progress.value = 30
    
    const geojson = await response.json()
    
    progress.value = 50
    
    // Transform GeoJSON features to scatter plot data
    cityData.value = geojson.features.map(feature => {
      const props = feature.properties
      const coords = feature.geometry.coordinates
      
      return {
        name: props.city_name,
        value: [coords[0], coords[1], props.population_2020], // [longitude, latitude, population]
        population: props.population_2020,
        province: props.province,
        region: props.region,
        temperature: props.temperature,
        pollutant_index: props.pollutant_index
      }
    })
    
    // Complete Step 1
    steps.value[0].completed = true
    steps.value[0].active = false
    currentStep.value = 1
    progress.value = 60
    
    console.log(`Loaded ${cityData.value.length} cities`)
    
    // Step 2: Generate Plot
    console.log('Step 2: Generating plot...')
    steps.value[1].active = true
    progress.value = 70
    
    // Simulate plot generation time (small delay for visual feedback)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    progress.value = 90
    
    // Complete Step 2
    steps.value[1].completed = true
    steps.value[1].active = false
    currentStep.value = 2
    progress.value = 100
    
    console.log('Plot generation completed')
    
  } catch (err) {
    console.error('Error fetching city data:', err)
    error.value = `Failed to load city data: ${err.message}`
  } finally {
    loading.value = false
  }
}

/**
 * Reload the visualization with progress tracking
 */
const reloadVisualization = () => {
  fetchCityData()
}

/**
 * Computed chart option for ECharts
 */
const chartOption = computed(() => {
  if (!cityData.value.length) return {}
  
  // Calculate size range based on population
  const populations = cityData.value.map(city => city.population)
  const minPop = Math.min(...populations)
  const maxPop = Math.max(...populations)
  
  // Normalize population to size (10-50 range)
  const getSize = (population) => {
    return 10 + (population - minPop) / (maxPop - minPop) * 40
  }
  
  return {
    title: {
      text: 'Indian Cities Population Distribution',
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
            <p style="margin: 4px 0;"><strong>Region:</strong> ${city.region}</p>
            <p style="margin: 4px 0;"><strong>Population:</strong> ${city.population.toLocaleString()}</p>
            <p style="margin: 4px 0;"><strong>Temperature:</strong> ${(city.temperature - 273.15).toFixed(1)}°C</p>
            <p style="margin: 4px 0;"><strong>Pollution Index:</strong> ${city.pollutant_index.toFixed(3)}</p>
          </div>
        `
      }
    },
    visualMap: {
      type: 'continuous',
      min: minPop,
      max: maxPop,
      left: 'left',
      top: 'bottom',
      text: ['High', 'Low'],
      calculable: true,
      inRange: {
        color: ['#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#fee090', '#fdae61', '#f46d43', '#d73027']
      },
      textStyle: {
        color: '#333'
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '15%',
      bottom: '15%'
    },
    xAxis: {
      type: 'value',
      name: 'Longitude',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: {
        formatter: '{value}°E'
      }
    },
    yAxis: {
      type: 'value',
      name: 'Latitude',
      nameLocation: 'middle',
      nameGap: 40,
      axisLabel: {
        formatter: '{value}°N'
      }
    },
    series: [
      {
        name: 'Cities',
        type: 'scatter',
        data: cityData.value.map(city => ({
          ...city,
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
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        },
        animationDuration: 2000,
        animationEasing: 'cubicOut',
        animationDelay: function (idx) {
          return idx * 50 // Staggered animation
        }
      }
    ]
  }
})

// Lifecycle
onMounted(() => {
  // Initialize first step as active
  if (steps.value.length > 0) {
    steps.value[0].active = true
  }
  fetchCityData()
})
</script>

<style scoped>
.indian-cities-map {
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
</style> 