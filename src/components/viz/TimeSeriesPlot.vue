<template>
  <div class="time-series-plot">
    <v-card elevation="0" class="mb-0" variant="outlined" tile>
      <v-card-title class="text-h6 font-weight-bold" style="color: #1E324F;">
        {{ props.panelTitle || 'Time Series Plot' }}
      </v-card-title>
      <v-card-text>
        <v-chart 
          class="chart" 
          :option="chartOption" 
          :loading="loading"
          autoresize
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

// Register ECharts components
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent
])

/**
 * Time Series Scatter-Line Plot Component
 * 
 * @param {string} dataUrl - URL to fetch CSV data from internet
 * @param {string} csvData - CSV data as string (alternative to dataUrl)
 * @param {string} dateColumn - Name of the date column in CSV
 * @param {Object} dataColumns - Object with column names as keys and colors as values
 * @param {string} xTicks - X-axis tick format ('yearly', 'monthly', etc.)
 * @param {string} yLabel - Y-axis label
 * @param {number} scatterInterval - Interval to enlarge scatter points (default: 1)
 * @param {string} chartTitle - Chart title for the plot
 * @param {string} panelTitle - Panel title to display above the chart
 * @param {string} unit - Unit of measurement for the data values
 * @param {number} xTickInterval - Interval for x-axis tick display (default: 1)
 */
const props = defineProps({
  dataUrl: {
    type: String,
    default: ''
  },
  csvData: {
    type: String,
    default: ''
  },
  dateColumn: {
    type: String,
    required: true
  },
  dataColumns: {
    type: Object,
    required: true
  },
  xTicks: {
    type: String,
    default: 'yearly'
  },
  yLabel: {
    type: String,
    default: 'Value'
  },
  scatterInterval: {
    type: Number,
    default: 1
  },
  chartTitle: {
    type: String,
    default: ''
  },
  panelTitle: {
    type: String,
    default: ''
  },
  unit: {
    type: String,
    default: ''
  },
  xTickInterval: {
    type: Number,
    default: 1
  }
})

const data = ref([])
const loading = ref(false)

/**
 * Parse CSV data into structured format
 * @param {string} csvText - Raw CSV text
 * @returns {Array} Parsed data array
 */
const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
  const result = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.replace(/"/g, '').replace(/\r/g, '').trim())
    const row = {}
    headers.forEach((header, index) => {
      row[header] = values[index]
    })
    result.push(row)
  }

  return result
}

/**
 * Fetch data from URL or use provided CSV data
 */
const fetchData = async () => {
  try {
    loading.value = true
    let csvText = ''

    if (props.dataUrl) {
      const response = await fetch(props.dataUrl)
      csvText = await response.text()
    } else if (props.csvData) {
      csvText = props.csvData
    } else {
      console.error('No data source provided')
      return
    }

    data.value = parseCSV(csvText)
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

/**
 * Load CSV data from local file
 */
const loadLocalCSV = async () => {
  try {
    loading.value = true
    // For local files, we'll use the csvData prop
    if (props.csvData) {
      data.value = parseCSV(props.csvData)
    }
  } catch (error) {
    console.error('Error loading local CSV:', error)
  } finally {
    loading.value = false
  }
}

/**
 * Computed chart option for ECharts
 */
const chartOption = computed(() => {
  if (!data.value.length) return {}

  const series = []
  const dateData = data.value.map(row => row[props.dateColumn])

  // Create series for each data column
  Object.entries(props.dataColumns).forEach(([columnName, color]) => {
    const values = data.value.map(row => {
      const value = parseFloat(row[columnName])
      return isNaN(value) ? null : value
    })

    series.push({
      name: columnName,
      type: 'line',
      data: values,
      symbol: 'circle',
      symbolSize: (value, params) => {
        // Enlarge scatter points at specified intervals
        const index = params.dataIndex
        return index % props.scatterInterval === 0 ? 5 : 3
      },
      itemStyle: {
        color: '#ffffff',
        borderColor: color,
        borderWidth: 1
      },
      lineStyle: {
        color: color,
        width: 4
      },
      emphasis: {
        focus: 'series'
      },
      smooth: false,
      showSymbol: true
    })
  })
  
  console.log('Date length:', dateData.length)
  console.log('Series lengths:', series, props.dataColumns, data)
  
  return {
    title: {
      text: props.chartTitle,
      left: 'center',
      textStyle: {
        color: '#1E324F',
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        let result = `<div style="font-weight: bold; margin-bottom: 8px;">${params[0].axisValue}</div>`
        
        params.forEach(param => {
          const value = param.value !== null && param.value !== undefined 
            ? param.value.toFixed(2) 
            : 'N/A'
          const unitText = props.unit ? ` ${props.unit}` : ''
          result += `<div style="margin: 4px 0;">
            <span style="display: inline-block; width: 10px; height: 10px; background-color: ${param.color}; margin-right: 8px;"></span>
            <span style="font-weight: 500;">${param.seriesName}:</span> 
            <span style="font-weight: bold;">${value}${unitText}</span>
          </div>`
        })
        
        return result
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {
      data: Object.keys(props.dataColumns),
      bottom: 10,
      textStyle: {
        color: '#2F3E4E'
      }
    },
    grid: {
      left: '3%',
      right: '2%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dateData,
      boundaryGap: false, // Remove gap at the beginning and end
      axisTick: {
        interval: props.xTickInterval - 1 // ECharts uses 0-based interval
      },
      axisLabel: {
        color: '#2F3E4E',
        interval: props.xTickInterval - 1, // ECharts uses 0-based interval
        formatter: (value) => {
          if (props.xTicks === 'yearly') {
            return value
          } else if (props.xTicks === 'monthly') {
            return value.substring(0, 7) // YYYY-MM format
          }
          return value
        }
      },
      axisLine: {
        lineStyle: {
          color: '#2F3E4E'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: props.yLabel,
      nameTextStyle: {
        color: '#2F3E4E',
        fontSize: 12,
        fontWeight: 'bold'
      },
      axisLabel: {
        color: '#2F3E4E',
        fontSize: 11
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#2F3E4E',
          width: 1
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#2F3E4E'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#E0E0E0',
          type: 'dashed'
        }
      },
      splitArea: {
        show: false
      }
    },
    series: series
  }
})

// Watch for prop changes
watch(() => [props.dataUrl, props.csvData, props.dataColumns, props.scatterInterval], () => {
  fetchData()
}, { immediate: true })

// Initialize on mount
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.time-series-plot {
  width: 100%;
}

.chart {
  width: 100%;
  height: 400px;
}

@media (max-width: 768px) {
  .chart {
    height: 300px;
  }
}
</style>