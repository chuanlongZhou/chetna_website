<template>
  <div class="timeline-component">
    <v-card elevation="2" class="timeline-card">

      <v-card-text class="py-0">
        <v-timeline align="center" density="compact">
          <v-timeline-item v-for="(item, index) in timelineData" :key="index"
            :dot-color="item.color || getDefaultColor(index)" size="small" :icon="item.icon || getDefaultIcon(index)"
            fill-dot>
            <template v-slot:opposite>
              <div class="text-caption font-weight-medium" style="color: #555555; font-size: 0.75rem;">
                {{ formatYearMonth(item.yearMonth) || item.date || `Step ${index + 1}` }}
              </div>
            </template>
            <v-card class="timeline-item-card" elevation="1" @mouseenter="hoveredIndex = index"
              @mouseleave="hoveredIndex = null">
              <v-card-title class="text-h6 font-weight-bold" style="color: #1E324F;">
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle class="text-caption font-weight-normal" style="color: #666666; padding-top: 0;">
                {{ formatYearMonth(item.yearMonth) }}
              </v-card-subtitle>
              <v-card-text class="text-body-2" style="color: #2F3E4E;">
                {{ item.description }}
              </v-card-text>
              <v-expand-transition>
                <div v-show="hoveredIndex === index && item.breakdownTasks">
                  <v-divider></v-divider>
                  <v-card-text class="text-body-2" style="color: #555555;">
                    <div class="text-subtitle-2 font-weight-medium mb-2" style="color: #1E324F;">
                      Key Tasks:
                    </div>
                    <ul class="ma-0 pa-0" style="list-style: none;">
                      <li v-for="(task, taskIndex) in item.breakdownTasks" :key="taskIndex" class="mb-1"
                        style="color: #666666;">
                        <v-icon size="small" color="primary" class="mr-2">mdi-check-circle</v-icon>
                        {{ task }}
                      </li>
                    </ul>
                  </v-card-text>
                </div>
              </v-expand-transition>
              <v-card-actions v-if="item.details">
                <v-btn variant="text" size="small" :color="item.color || getDefaultColor(index)"
                  @click="toggleDetails(index)">
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
const hoveredIndex = ref(null)

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

/**
 * Format year-month string to readable format
 * @param {string} yearMonth - Year-month string in format 'YYYY-MM'
 * @returns {string} Formatted date string
 */
const formatYearMonth = (yearMonth) => {
  if (!yearMonth) return null

  const [year, month] = yearMonth.split('-')
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  return `${monthNames[parseInt(month) - 1]} ${year}`
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
  margin-bottom: 0px;
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
  margin-left: 8px;
}

:deep(.v-timeline-item__opposite) {
  min-width: 120px;
}

</style>