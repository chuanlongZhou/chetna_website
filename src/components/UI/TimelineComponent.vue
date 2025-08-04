<template>
  <div class="timeline-component">
    <v-card elevation="2" class="timeline-card">
      <v-card-title class="text-h5 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
        {{ title || 'Timeline' }}
      </v-card-title>
      <v-card-text>
        <v-timeline align="start" density="compact">
          <v-timeline-item
            v-for="(item, index) in timelineData"
            :key="index"
            :dot-color="item.color || getDefaultColor(index)"
            size="small"
            :icon="item.icon || getDefaultIcon(index)"
          >
            <template v-slot:opposite>
              <div class="text-caption font-weight-medium" style="color: #555555;">
                {{ item.date || `Step ${index + 1}` }}
              </div>
            </template>
            <v-card class="timeline-item-card" elevation="1">
              <v-card-title class="text-h6 font-weight-bold" style="color: #1E324F;">
                {{ item.title }}
              </v-card-title>
              <v-card-text class="text-body-2" style="color: #2F3E4E;">
                {{ item.description }}
              </v-card-text>
              <v-card-actions v-if="item.details">
                <v-btn
                  variant="text"
                  size="small"
                  :color="item.color || getDefaultColor(index)"
                  @click="toggleDetails(index)"
                >
                  {{ expandedItems[index] ? 'Show Less' : 'Show More' }}
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="expandedItems[index]">
                  <v-divider></v-divider>
                  <v-card-text class="text-body-2" style="color: #555555;">
                    {{ item.details }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/**
 * Timeline Component
 * Displays timeline data in a visually appealing format using Vuetify timeline
 * 
 * @param {Array} timelineData - Array of timeline items with title, description, date, color, icon, details
 * @param {string} title - Title for the timeline section
 */
const props = defineProps({
  timelineData: {
    type: Array,
    required: true,
    default: () => []
  },
  title: {
    type: String,
    default: 'Timeline'
  }
})

const expandedItems = ref({})

/**
 * Toggle details visibility for a timeline item
 * @param {number} index - Index of the timeline item
 */
const toggleDetails = (index) => {
  expandedItems.value[index] = !expandedItems.value[index]
}

/**
 * Get default color for timeline item based on index
 * @param {number} index - Index of the timeline item
 * @returns {string} Color value
 */
const getDefaultColor = (index) => {
  const colors = ['total', 'power', 'traffic', 'industrial', 'primary', 'secondary']
  return colors[index % colors.length]
}

/**
 * Get default icon for timeline item based on index
 * @param {number} index - Index of the timeline item
 * @returns {string} Icon name
 */
const getDefaultIcon = (index) => {
  const icons = ['mdi-calendar', 'mdi-clock', 'mdi-check-circle', 'mdi-star', 'mdi-flag', 'mdi-trophy']
  return icons[index % icons.length]
}
</script>

<style scoped>
.timeline-component {
  width: 100%;
}

.timeline-card {
  border-radius: 12px;
  overflow: hidden;
}

.timeline-item-card {
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.timeline-item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:deep(.v-timeline-item__dot) {
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

:deep(.v-timeline-item__body) {
  margin-left: 16px;
}

:deep(.v-timeline-item__opposite) {
  min-width: 120px;
}
</style> 