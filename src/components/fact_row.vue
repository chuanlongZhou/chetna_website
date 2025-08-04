<template>
  <div 
    ref="factRowRef"
    class="fact-row"
    :class="{ 'animate-in': isVisible }"
    :style="{ '--theme-color': themeColor }"
  >
    <v-container fluid>
             <!-- Title Row - Full Width -->
       <v-row class="title-row">
         <v-col cols="12">
           <div class="title-content">
             <!-- Leading Icon -->
             <div v-if="leadingIcon" class="leading-icon">
               <v-icon :icon="leadingIcon" size="large" color="white"  />
             </div>
             
             <!-- Main Title -->
             <h3 class="fact-title text-h5 font-weight-bold" :style="{ color: themeColor }">
               {{ paragraphTitle }}
             </h3>
           </div>
         </v-col>
       </v-row>

      <!-- Content Row - Paragraph + Figure -->
      <v-row align="start" class="content-row">
        <!-- Paragraph Column -->
        <v-col cols="12" md="4" :class="['paragraph-column', { 'order-md-2': leftFigure }]">
          <div class="paragraph-content">
            <p class="fact-text text-body-1 text-primary-2">
              {{ paragraphText }}
            </p>
          </div>
        </v-col>

                 <!-- Chart Column -->
         <v-col cols="12" md="8" :class="['chart-column', { 'order-md-1': leftFigure }]">
           <TimeSeriesPlot 
             v-if="chartType === 'line'"
             :data-url="dataUrl" 
             :csv-data="csvData" 
             :date-column="dateColumn" 
             :data-columns="dataColumns"
             :x-ticks="xTicks" 
             :y-label="yLabel" 
             :scatter-interval="scatterInterval" 
             :chartTitle="chartTitle" 
             :panelTitle="panelTitle" 
             :unit="unit"
             :x-tick-interval="xTickInterval" 
           />
           <BarPlot 
             v-else-if="chartType === 'bar'"
             :data-url="dataUrl" 
             :csv-data="csvData" 
             :date-column="dateColumn" 
             :data-columns="dataColumns"
             :x-ticks="xTicks" 
             :y-label="yLabel" 
             :chartTitle="chartTitle" 
             :panelTitle="panelTitle" 
             :unit="unit"
             :x-tick-interval="xTickInterval"
             :bar-type="barType"
             :bar-direction="barDirection"
           />
         </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TimeSeriesPlot from './viz/TimeSeriesPlot.vue'
import BarPlot from './viz/BarPlot.vue'

const factRowRef = ref(null)
const isVisible = ref(false)

/**
 * Intersection Observer for scroll animation
 */
const observer = ref(null)

const handleIntersection = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Show element when scrolling down and it comes into view
      isVisible.value = true
    } else {
      // Hide element when scrolling up and it goes out of view
      isVisible.value = false
    }
  })
}

onMounted(() => {
  // Create intersection observer
  observer.value = new IntersectionObserver(handleIntersection, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  })

  // Start observing
  if (factRowRef.value) {
    observer.value.observe(factRowRef.value)
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})

/**
 * Fact Row Component
 * 
 * Displays a paragraph and time series plot in a two-column layout
 * 
 * @param {boolean} leftFigure - Controls figure placement (true = left, false = right)
 * @param {string} paragraphTitle - Title for the paragraph section
 * @param {string} paragraphText - Text content for the paragraph
 * @param {string} leadingIcon - Icon name for the leading icon
 * @param {string} panelTitle - Title for the panel/component
 * @param {string} chartTitle - Chart title for ECharts
 * @param {string} themeColor - Theme color for the panel (default: '#FF9800')
 * @param {string} dataUrl - URL to fetch CSV data from internet
 * @param {string} csvData - CSV data as string (alternative to dataUrl)
 * @param {string} dateColumn - Name of the date column in CSV
 * @param {Object} dataColumns - Object with column names as keys and colors as values
 * @param {string} xTicks - X-axis tick format ('yearly', 'monthly', etc.)
 * @param {string} yLabel - Y-axis label
 * @param {number} scatterInterval - Interval to enlarge scatter points (default: 1)
 * @param {string} unit - Unit of measurement for the data values
 * @param {number} xTickInterval - Interval for x-axis tick display (default: 1)
 * @param {string} chartType - Type of chart to display ('line' or 'bar')
 * @param {string} barType - Type of bar chart ('stacked' or 'overlay') - only for bar charts
 * @param {string} barDirection - Direction of bars ('vertical' or 'horizontal') - only for bar charts
 */
const props = defineProps({
  // Layout control
  leftFigure: {
    type: Boolean,
    default: false
  },

  // Text content
  paragraphTitle: {
    type: String,
    required: true
  },
  paragraphText: {
    type: String,
    required: true
  },
  leadingIcon: {
    type: String,
    default: ''
  },
  panelTitle: {
    type: String,
    default: ''
  },
  chartTitle: {
    type: String,
    default: ''
  },
  themeColor: {
    type: String,
    default: '#FF9800'
  },

  // TimeSeriesPlot props
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
  unit: {
    type: String,
    default: ''
  },
  xTickInterval: {
    type: Number,
    default: 1
  },
  chartType: {
    type: String,
    default: 'line',
    validator: (value) => ['line', 'bar'].includes(value)
  },
  barType: {
    type: String,
    default: 'overlay',
    validator: (value) => ['stacked', 'overlay'].includes(value)
  },
  barDirection: {
    type: String,
    default: 'vertical',
    validator: (value) => ['vertical', 'horizontal'].includes(value)
  }
})
</script>

<style scoped>
.fact-row {
  padding: 3rem 0;
  margin: 2rem 0;
  border-radius: 10px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: 0 8px 32px rgba(30, 50, 79, 0.08);
  border: 1px solid rgba(30, 50, 79, 0.06);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fact-row.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.fact-row::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: var(--theme-color);
  animation: shimmer 3s ease-in-out infinite;
}

.fact-row:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(30, 50, 79, 0.12);
}

.fact-row:last-child {
  margin-bottom: 0;
}

.title-row {
  margin-bottom: 1rem;
  position: relative;
}

.title-content {
  display: flex;
  align-items: center;
  padding: 0 2rem;
  position: relative;
}



.leading-icon {
  display: flex;
  align-items: center;
  margin-right: 1rem;
  padding: 12px;
  background: var(--theme-color);
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(30, 50, 79, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

.fact-title {
  color: #1E324F;
  line-height: 1.3;
  font-size: 1.75rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(30, 50, 79, 0.1);
  position: relative;
}

.fact-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--theme-color);
  border-radius: 2px;
}

.content-row {
  min-height: 450px;
  padding: 0 1rem;
}

.paragraph-column {
  display: flex;
  align-items: flex-start;
}

.paragraph-content {
  padding: 0 1rem;
}

.fact-text {
  line-height: 1.8;
  margin-bottom: 0;
  font-size: 1.1rem;
  font-weight: 400;
}

.chart-column {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1 0rem;
}

/* Animations */
@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Hover effects */
.fact-row:hover .leading-icon {
  animation: pulse 1s ease-in-out infinite;
}

.fact-row:hover .fact-title::after {
  width: 80px;
  transition: width 0.3s ease;
}

/* Responsive design */
@media (max-width: 768px) {
  .fact-row {
    padding: 2rem 1rem;
    margin: 1rem 0;
  }

  .content-row {
    min-height: auto;
    padding: 0 0.5rem;
  }

  .paragraph-column {
    order: 1;
    margin-bottom: 2rem;
  }

  .chart-column {
    order: 2;
  }

  .paragraph-content {
    padding: 1rem;
  }

  .title-content {
    padding: 0 1rem;
  }

  .fact-title {
    font-size: 1.5rem;
  }

  .leading-icon {
    padding: 8px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .fact-row {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .paragraph-content {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>