<template>
  <div class="progress-loader">
    <!-- Linear Progress Bar -->
    <div v-if="type === 'linear'" class="linear-progress">
      <v-card class="pa-6" elevation="2">
        <div class="text-center mb-4">
          <v-icon size="48" color="primary" class="mb-3">
            {{ icon }}
          </v-icon>
          <h3 class="text-h6 mb-2">{{ title }}</h3>
          <p class="text-body-2 text-medium-emphasis">{{ message }}</p>
        </div>
        
        <v-progress-linear
          :model-value="progress"
          :indeterminate="indeterminate"
          :color="color"
          height="8"
          rounded
          class="mb-3"
        ></v-progress-linear>
        
        <div v-if="!indeterminate" class="d-flex justify-space-between align-center">
          <span class="text-caption">{{ progress }}%</span>
          <span class="text-caption">{{ currentStep }} / {{ totalSteps }}</span>
        </div>
        
        <div v-if="steps.length > 0" class="mt-4">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="step-item d-flex align-center mb-2"
          >
            <v-icon 
              :color="step.completed ? 'success' : step.active ? 'primary' : 'grey'"
              size="20"
              class="mr-3"
            >
              {{ step.completed ? 'mdi-check-circle' : step.active ? 'mdi-loading' : 'mdi-circle-outline' }}
            </v-icon>
            <span 
              :class="[
                'text-body-2',
                step.completed ? 'text-success' : step.active ? 'text-primary' : 'text-medium-emphasis'
              ]"
            >
              {{ step.label }}
            </span>
          </div>
        </div>
      </v-card>
    </div>

    <!-- Circular Progress -->
    <div v-else-if="type === 'circular'" class="circular-progress">
      <v-card class="pa-6 text-center" elevation="2">
        <v-progress-circular
          :model-value="progress"
          :indeterminate="indeterminate"
          :color="color"
          :size="120"
          :width="8"
          class="mb-4"
        >
          <span v-if="!indeterminate" class="text-h6 font-weight-bold">
            {{ progress }}%
          </span>
        </v-progress-circular>
        
        <h3 class="text-h6 mb-2">{{ title }}</h3>
        <p class="text-body-2 text-medium-emphasis mb-3">{{ message }}</p>
        
        <div v-if="steps.length > 0" class="steps-container">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="step-item d-flex align-center justify-center mb-2"
          >
            <v-icon 
              :color="step.completed ? 'success' : step.active ? 'primary' : 'grey'"
              size="16"
              class="mr-2"
            >
              {{ step.completed ? 'mdi-check-circle' : step.active ? 'mdi-loading' : 'mdi-circle-outline' }}
            </v-icon>
            <span 
              :class="[
                'text-caption',
                step.completed ? 'text-success' : step.active ? 'text-primary' : 'text-medium-emphasis'
              ]"
            >
              {{ step.label }}
            </span>
          </div>
        </div>
      </v-card>
    </div>

    <!-- Skeleton Loading -->
    <div v-else-if="type === 'skeleton'" class="skeleton-progress">
      <v-card class="pa-6" elevation="2">
        <div class="text-center mb-4">
          <v-skeleton-loader type="avatar" class="mx-auto mb-3" size="48"></v-skeleton-loader>
          <v-skeleton-loader type="heading" class="mb-2"></v-skeleton-loader>
          <v-skeleton-loader type="text" class="mb-3"></v-skeleton-loader>
        </div>
        
        <v-skeleton-loader type="progress-linear" class="mb-3"></v-skeleton-loader>
        
        <div class="d-flex justify-space-between">
          <v-skeleton-loader type="text" width="60"></v-skeleton-loader>
          <v-skeleton-loader type="text" width="60"></v-skeleton-loader>
        </div>
        
        <div class="mt-4">
          <v-skeleton-loader 
            v-for="i in 3" 
            :key="i"
            type="list-item-two-line" 
            class="mb-2"
          ></v-skeleton-loader>
        </div>
      </v-card>
    </div>

    <!-- Overlay Progress -->
    <div v-else-if="type === 'overlay'" class="overlay-progress">
      <v-overlay
        :model-value="true"
        class="align-center justify-center"
        persistent
      >
        <v-card class="pa-6 text-center" max-width="400" elevation="8">
          <v-progress-circular
            :indeterminate="indeterminate"
            :color="color"
            :size="80"
            :width="6"
            class="mb-4"
          ></v-progress-circular>
          
          <h3 class="text-h6 mb-2">{{ title }}</h3>
          <p class="text-body-2 text-medium-emphasis">{{ message }}</p>
          
          <div v-if="steps.length > 0" class="mt-4">
            <div 
              v-for="(step, index) in steps" 
              :key="index"
              class="step-item d-flex align-center justify-center mb-1"
            >
              <v-icon 
                :color="step.completed ? 'success' : step.active ? 'primary' : 'grey'"
                size="16"
                class="mr-2"
              >
                {{ step.completed ? 'mdi-check-circle' : step.active ? 'mdi-loading' : 'mdi-circle-outline' }}
              </v-icon>
              <span 
                :class="[
                  'text-caption',
                  step.completed ? 'text-success' : step.active ? 'text-primary' : 'text-medium-emphasis'
                ]"
              >
                {{ step.label }}
              </span>
            </div>
          </div>
        </v-card>
      </v-overlay>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Progress Loader Component
 * Provides different types of progress indicators for loading and creating visualizations
 */

// Props
const props = defineProps({
  /** Type of progress indicator: 'linear', 'circular', 'skeleton', 'overlay' */
  type: {
    type: String,
    default: 'linear',
    validator: (value) => ['linear', 'circular', 'skeleton', 'overlay'].includes(value)
  },
  /** Progress percentage (0-100) */
  progress: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100
  },
  /** Whether to show indeterminate progress */
  indeterminate: {
    type: Boolean,
    default: false
  },
  /** Progress color */
  color: {
    type: String,
    default: 'primary'
  },
  /** Title text */
  title: {
    type: String,
    default: 'Loading...'
  },
  /** Message text */
  message: {
    type: String,
    default: 'Please wait while we process your request'
  },
  /** Icon to display */
  icon: {
    type: String,
    default: 'mdi-loading'
  },
  /** Current step number */
  currentStep: {
    type: Number,
    default: 0
  },
  /** Total number of steps */
  totalSteps: {
    type: Number,
    default: 0
  },
  /** Array of step objects with { label, completed, active } properties */
  steps: {
    type: Array,
    default: () => []
  }
})

// Computed properties
const progressPercentage = computed(() => {
  return Math.min(100, Math.max(0, props.progress))
})

const currentStepDisplay = computed(() => {
  return props.currentStep || 0
})

const totalStepsDisplay = computed(() => {
  return props.totalSteps || 0
})
</script>

<style scoped>
.progress-loader {
  width: 100%;
}

.linear-progress,
.circular-progress,
.skeleton-progress {
  max-width: 600px;
  margin: 0 auto;
}

.step-item {
  transition: all 0.3s ease;
}

.steps-container {
  max-height: 200px;
  overflow-y: auto;
}

.overlay-progress {
  z-index: 9999;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .linear-progress,
  .circular-progress,
  .skeleton-progress {
    max-width: 100%;
    margin: 0;
  }
  
  .circular-progress .v-progress-circular {
    width: 80px !important;
    height: 80px !important;
  }
}
</style> 