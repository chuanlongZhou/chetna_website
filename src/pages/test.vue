<template>
  <div class="test-page">
    <v-container fluid class="pa-4">
      <!-- Header -->
      <v-row>
        <v-col cols="12">
          <v-card class="pa-4 mb-6">
            <h1 class="text-h4 mb-2">Progress Loader Component Test</h1>
            <p class="text-body-1 text-medium-emphasis">
              This page demonstrates the different types of progress loaders for loading and creating visualizations.
            </p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Controls -->
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="pa-4">
            <h3 class="text-h6 mb-4">Progress Controls</h3>
            
            <v-select
              v-model="selectedType"
              :items="progressTypes"
              label="Progress Type"
              class="mb-4"
            ></v-select>

            <v-slider
              v-model="progressValue"
              :min="0"
              :max="100"
              label="Progress Value"
              thumb-label
              class="mb-4"
            ></v-slider>

            <v-switch
              v-model="isIndeterminate"
              label="Indeterminate"
              class="mb-4"
            ></v-switch>

            <v-text-field
              v-model="title"
              label="Title"
              class="mb-4"
            ></v-text-field>

            <v-textarea
              v-model="message"
              label="Message"
              rows="2"
              class="mb-4"
            ></v-textarea>

            <v-select
              v-model="color"
              :items="colorOptions"
              label="Color"
              class="mb-4"
            ></v-select>

            <v-btn
              @click="startSimulation"
              color="primary"
              block
              :disabled="isSimulating"
              class="mb-2"
            >
              {{ isSimulating ? 'Simulating...' : 'Start Simulation' }}
            </v-btn>

            <v-btn
              @click="resetProgress"
              color="secondary"
              block
              variant="outlined"
            >
              Reset
            </v-btn>
          </v-card>
        </v-col>

        <!-- Progress Display -->
        <v-col cols="12" md="8">
          <v-card class="pa-4">
            <h3 class="text-h6 mb-4">Progress Loader Preview</h3>
            
            <ProgressLoader
              :type="selectedType"
              :progress="progressValue"
              :indeterminate="isIndeterminate"
              :color="color"
              :title="title"
              :message="message"
              :icon="icon"
              :current-step="currentStep"
              :total-steps="totalSteps"
              :steps="steps"
            />
          </v-card>
        </v-col>
      </v-row>

      <!-- Step Controls -->
      <v-row v-if="selectedType !== 'skeleton'">
        <v-col cols="12">
          <v-card class="pa-4">
            <h3 class="text-h6 mb-4">Step Management</h3>
            
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="totalSteps"
                  type="number"
                  label="Total Steps"
                  :min="0"
                  :max="10"
                  class="mb-4"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="currentStep"
                  type="number"
                  label="Current Step"
                  :min="0"
                  :max="totalSteps"
                  class="mb-4"
                ></v-text-field>
              </v-col>
            </v-row>

            <div class="mb-4">
              <h4 class="text-subtitle-1 mb-2">Custom Steps</h4>
              <div v-for="(step, index) in steps" :key="index" class="d-flex align-center mb-2">
                <v-text-field
                  v-model="step.label"
                  label="Step Label"
                  density="compact"
                  class="mr-2"
                  style="flex: 1;"
                ></v-text-field>
                <v-switch
                  v-model="step.completed"
                  label="Completed"
                  density="compact"
                  class="mr-2"
                ></v-switch>
                <v-switch
                  v-model="step.active"
                  label="Active"
                  density="compact"
                  class="mr-2"
                ></v-switch>
                <v-btn
                  @click="removeStep(index)"
                  color="error"
                  size="small"
                  icon
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
              <v-btn
                @click="addStep"
                color="primary"
                variant="outlined"
                size="small"
              >
                Add Step
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>



      <!-- Visualization Test -->
      <v-row>
        <v-col cols="12">
          <v-card class="pa-4">
            <h3 class="text-h6 mb-4">Visualization with Progress</h3>
            
            <div v-if="vizLoading" class="text-center pa-8">
              <ProgressLoader
                type="overlay"
                :indeterminate="true"
                title="Creating Visualization"
                message="Loading city data and generating map..."
                :steps="vizSteps"
              />
            </div>
            
            <div v-else>
              <v-btn
                @click="loadVisualization"
                color="primary"
                class="mb-4"
              >
                Load Visualization
              </v-btn>
              
              <IndianCitiesMap />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProgressLoader from '@/components/UI/ProgressLoader.vue'
import IndianCitiesMap from '@/components/viz/IndianCitiesMap.vue'

// Progress type options
const progressTypes = [
  { title: 'Linear Progress', value: 'linear' },
  { title: 'Circular Progress', value: 'circular' },
  { title: 'Skeleton Loading', value: 'skeleton' },
  { title: 'Overlay Progress', value: 'overlay' }
]

// Color options
const colorOptions = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error'
]

// Reactive state
const selectedType = ref('linear')
const progressValue = ref(0)
const isIndeterminate = ref(false)
const title = ref('Loading Data...')
const message = ref('Please wait while we process your request')
const color = ref('primary')
const currentStep = ref(0)
const totalSteps = ref(3)
const steps = ref([
  { label: 'Initializing', completed: false, active: true },
  { label: 'Loading Data', completed: false, active: false },
  { label: 'Processing', completed: false, active: false }
])

// Line stack chart data
const lineStackData = ref({
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  data: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
})

// Visualization test state
const vizLoading = ref(false)
const vizSteps = ref([
  { label: 'Fetching city data', completed: false, active: true },
  { label: 'Processing coordinates', completed: false, active: false },
  { label: 'Generating map', completed: false, active: false },
  { label: 'Applying styling', completed: false, active: false }
])

// Computed properties
const icon = computed(() => {
  switch (selectedType.value) {
    case 'linear':
      return 'mdi-progress-clock'
    case 'circular':
      return 'mdi-loading'
    case 'skeleton':
      return 'mdi-skeleton'
    case 'overlay':
      return 'mdi-chart-line'
    default:
      return 'mdi-loading'
  }
})

// Methods
const startSimulation = () => {
  if (isSimulating.value) return
  
  isSimulating.value = true
  progressValue.value = 0
  currentStep.value = 0
  
  // Reset steps
  steps.value.forEach(step => {
    step.completed = false
    step.active = false
  })
  
  if (steps.value.length > 0) {
    steps.value[0].active = true
  }
  
  const interval = setInterval(() => {
    progressValue.value += 2
    
    // Update steps based on progress
    const stepIndex = Math.floor((progressValue.value / 100) * steps.value.length)
    steps.value.forEach((step, index) => {
      step.completed = index < stepIndex
      step.active = index === stepIndex
    })
    
    currentStep.value = stepIndex + 1
    
    if (progressValue.value >= 100) {
      clearInterval(interval)
      isSimulating.value = false
      progressValue.value = 100
      currentStep.value = totalSteps.value
      
      // Mark all steps as completed
      steps.value.forEach(step => {
        step.completed = true
        step.active = false
      })
    }
  }, 100)
}

const resetProgress = () => {
  progressValue.value = 0
  currentStep.value = 0
  isIndeterminate.value = false
  
  steps.value.forEach(step => {
    step.completed = false
    step.active = false
  })
  
  if (steps.value.length > 0) {
    steps.value[0].active = true
  }
}

const addStep = () => {
  steps.value.push({
    label: `Step ${steps.value.length + 1}`,
    completed: false,
    active: false
  })
  totalSteps.value = steps.value.length
}

const removeStep = (index) => {
  steps.value.splice(index, 1)
  totalSteps.value = steps.value.length
  if (currentStep.value > totalSteps.value) {
    currentStep.value = totalSteps.value
  }
}

const loadVisualization = async () => {
  vizLoading.value = true
  
  // Simulate visualization loading process
  for (let i = 0; i < vizSteps.value.length; i++) {
    vizSteps.value[i].active = true
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    vizSteps.value[i].completed = true
    vizSteps.value[i].active = false
    
    if (i < vizSteps.value.length - 1) {
      vizSteps.value[i + 1].active = true
    }
  }
  
  // Additional delay to show completion
  await new Promise(resolve => setTimeout(resolve, 1000))
  vizLoading.value = false
}

// Simulation state
const isSimulating = ref(false)

// Initialize
onMounted(() => {
  if (steps.value.length > 0) {
    steps.value[0].active = true
  }
})
</script>

<style scoped>
.test-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.v-card {
  border-radius: 12px;
}
</style> 