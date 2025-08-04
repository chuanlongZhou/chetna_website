<template>
  <div class="logo-status-container">
    <!-- Logo Status Indicator -->
    <div class="status-indicator" :class="{ 'active': appStore.isLogoHovered }">
      <v-icon :color="appStore.isLogoHovered ? 'primary' : 'grey'" size="small">
        {{ appStore.isLogoHovered ? 'mdi-eye' : 'mdi-eye-off' }}
      </v-icon>
      <span class="status-text ml-2">
        Logo {{ appStore.isLogoHovered ? 'Hovered' : 'Idle' }}
      </span>
    </div>

    <!-- Navigation Status -->
    <div class="nav-status mt-4">
      <h6 class="text-subtitle-2 mb-2">Navigation Items:</h6>
      <div class="nav-items">
                 <div 
           v-for="item in filteredNavigationItems" 
           :key="item.title"
           class="nav-item pa-2 mb-1 rounded"
           :class="{ 'active': $route.path === item.to }"
         >
          <v-icon size="small" class="mr-2">{{ item.icon }}</v-icon>
          {{ item.title }}
        </div>
      </div>
    </div>

    <!-- Current Page Info -->
    <div class="page-info mt-4">
      <h6 class="text-subtitle-2 mb-2">Current Page:</h6>
             <div class="current-page pa-2 rounded">
         <strong>{{ $route.path }}</strong>
         <div class="text-caption mt-1" v-html="formattedDescription"></div>
       </div>
    </div>

    <!-- Store Actions -->
    <div class="store-actions mt-4">
      <h6 class="text-subtitle-2 mb-2">Store Actions:</h6>
      <div class="action-buttons">
        <v-btn 
          size="small" 
          variant="outlined" 
          @click="appStore.setLogoHovered(!appStore.isLogoHovered)"
          class="mr-2 mb-2"
        >
          Toggle Logo Hover
        </v-btn>
        <v-btn 
          size="small" 
          variant="outlined" 
          @click="appStore.toggleDrawer()"
          class="mr-2 mb-2"
        >
          Toggle Drawer
        </v-btn>
        <v-btn 
          size="small" 
          variant="outlined" 
          @click="appStore.readNews()"
          class="mr-2 mb-2"
        >
          Read News
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * LogoStatus component demonstrates how to use global store data
 * Shows logo hover state, navigation items, and provides store actions
 */

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const appStore = useAppStore()

// Computed property for current page description
const currentPageDescription = computed(() => {
  return appStore.currentPageDescription(route.path)
})

// Formatted description with HTML rendering
const formattedDescription = computed(() => {
  const description = currentPageDescription.value
  // Convert line breaks to <br> tags and preserve HTML
  return description.replace(/\n/g, '<br>')
})

// Filtered navigation items (excluding News)
const filteredNavigationItems = computed(() => {
  return appStore.navigationItems.filter(item => item.title !== 'News')
})
</script>

<style scoped>
.logo-status-container {
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  max-width: 400px;
}

.status-indicator {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  background: white;
  transition: all 0.3s ease;
}

.status-indicator.active {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.status-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-items {
  background: white;
  border-radius: 4px;
  padding: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.nav-item.active {
  background: #e3f2fd;
  color: #1976d2;
}

.current-page {
  background: white;
  border-left: 4px solid #4caf50;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style> 