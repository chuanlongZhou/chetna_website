<template>
  <div>
    <!-- Expanded Header (Two Columns) - Shown when not scrolled -->
    <div class="expanded-header" :class="{ 'header-hidden': appStore.isScrolled }">
      <div class="header-container">
        <v-row no-gutters class="fill-height">
          <!-- Left Column -->
          <v-col cols="12" md="6" class="left-column" @mouseenter="appStore.setLogoHovered(true)"
            @mouseleave="appStore.setLogoHovered(false)">
            <div class="pa-8">
              <!-- Logo and Name -->
              <v-row class="d-flex align-center mb-6">
                <v-col cols="2" class="d-flex align-center justify-center pr-0">
                  <div class="logo-container" @mouseenter="appStore.setLogoHovered(true)"
                    @mouseleave="appStore.setLogoHovered(false)">
                    <v-img src="@/assets/CHETNA.svg" alt="CHETNA Logo" max-width="80" max-height="80" contain
                      :class="{ 'logo-hovered': appStore.isLogoHovered }" @error="handleImageError" />
                  </div>
                </v-col>
                <v-col cols="10" class="d-flex align-center pl-0">
                  <div>
                    <div class="d-flex align-center mb-1">
                      <ProjectTitle :external-trigger="appStore.isLogoHovered" />
                    </div>
                    <div class="align-center mt-2 ml-3">
                      <div class="header-title font-weight-thin text-blue-grey-lighten-5">100 Indian Cities</div>
                      <div class="header-subtitle text-caption text-blue-grey-lighten-5">
                        <v-icon color="deep-orange-darken-4" class="ml-0 mr-1">mdi-trending-up</v-icon>
                        Data-driven Insights
                      </div>
                    </div>
                  </div>

                </v-col>
              </v-row>

              <!-- Navigation Links -->
              <div class="mb-6">
                <v-btn v-for="item in filteredNavigationItems" :key="item.title" :to="item.to" variant="text"
                  density="comfortable" class="mx-1 px-2 mb-2 text-white text-overline nav-btn"
                  :class="{ 'v-btn--active': $route.path === item.to }">
                  <v-icon left class="mr-1">{{ item.icon }}</v-icon>
                  {{ item.title }}
                </v-btn>
              </div>

              <!-- Page Description -->
              <div>
                <div class="text-body-1 text-white font-weight-light" style="line-height: 1.6;">
                  <div class="description-text" v-html="formattedDescription"></div>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Right Column - Carousel Content -->
          <v-col cols="12" md="6" class="right-column">
            <!-- push to the center of the height -->
            <div class="d-flex align-center" style="height: 100%;">
              <div class="px-8 w-100">
                <h3 class="text-uppercase text-h5 text-grey-lighten-1 mb-4 font-weight-thin">Latest Updates</h3>
                <!-- Carousel Content Component -->
                <CarouselContent />
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Normal App Bar - Shown when scrolled -->
    <v-app-bar v-show="appStore.isScrolled" app color="mediumBlue" dark elevation="5" class="px-15"
      :class="{ 'app-bar-visible': appStore.isScrolled }" height="100" @mouseenter="appStore.setLogoHovered(true)"
      @mouseleave="appStore.setLogoHovered(false)">
      <!-- Mobile Menu Button -->
      <v-app-bar-nav-icon @click="appStore.toggleDrawer()" class="d-md-none ml-4"></v-app-bar-nav-icon>

      <!-- Logo and Title -->
      <v-container class="d-flex align-center px-8">
        <div class="logo-container" @mouseenter="appStore.setLogoHovered(true)"
          @mouseleave="appStore.setLogoHovered(false)">
          <v-img src="@/assets/CHETNA.svg" alt="CHETNA Logo" max-width="60" max-height="60" contain class="mr-4"
            :class="{ 'logo-hovered': appStore.isLogoHovered }" @error="handleImageError" />
        </div>

        <div class="d-flex align-baseline">
          <span class="text-h5 font-weight-thin ml-5 mr-5 smooth-text">Emissions for 100 Indian Cities</span>
          <ProjectTitle :external-trigger="appStore.isLogoHovered" />
        </div>
      </v-container>

      <!-- Desktop Navigation -->
      <v-spacer></v-spacer>

      <div class="d-none d-md-flex">
        <v-btn v-for="item in appStore.navigationItems" :key="item.title" :to="item.to" variant="text"
          density="comfortable" class="text-white nav-btn px-2 ml-2"
          :class="{ 'v-btn--active': $route.path === item.to }">
          <v-icon left class="mr-1">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <!-- <v-navigation-drawer v-model="appStore.drawer" app temporary color="mediumBlue" dark>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <div class="logo-container" @mouseenter="appStore.setLogoHovered(true)"
              @mouseleave="appStore.setLogoHovered(false)">
              <v-img src="@/assets/CHETNA.svg" alt="CHETNA Logo" max-width="120" max-height="40" contain class="mb-4"
                :class="{ 'logo-hovered': appStore.isLogoHovered }" @error="handleImageError" />
            </div>
            <div class="d-flex align-center">
              <ProjectTitle size="small" :external-trigger="appStore.isLogoHovered" />
            </div>
          </v-list-item-content>
          <span class="text-h6 font-weight-medium ml-2">100 Indian Cities</span>
        </v-list-item>

        <v-divider class="my-4"></v-divider>

        <v-list-item v-for="item in filteredNavigationItems" :key="item.title" :to="item.to" link
          @click="appStore.setDrawer(false)">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  </div>
</template>

<script setup>
/**
 * AppHeader component provides navigation for the CHETNA website
 * Features a two-column expanded header when page loads and transforms to normal app bar when scrolled
 */

import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import ProjectTitle from './ProjectTitle.vue'
import CarouselContent from './CarouselContent.vue'

const route = useRoute()
const appStore = useAppStore()



// Computed properties using store data
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

// Scroll detection
const handleScroll = () => {
  appStore.setScrolled(window.scrollY > 450)
}


// Handle image loading errors
const handleImageError = (event) => {
  console.error('Failed to load logo image:', event)
}



// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Check initial scroll position
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.expanded-header {
  background: linear-gradient(to right, #1d466b 50%, #214f71 50%);
  min-height: 550px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1000;
  display: flex;
  justify-content: center;
}

.header-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
}

.header-hidden {
  transform: translateY(-100%);
  opacity: 0;
}

.left-column {
  background: #1d466b;
}

.right-column {
  background: #214f71;
}

.news-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(10px);
}



.v-btn {
  background-color: transparent !important;
}

/* Navigation button hover effects */
.nav-btn {
  transition: all 0.3s ease !important;
  background-color: transparent !important;
  color: white !important;
}

.nav-btn:hover,
.nav-btn.v-btn--active {
  background-color: white !important;
  color: #1d466b !important;
}

.nav-btn:hover .v-icon,
.nav-btn.v-btn--active .v-icon {
  color: #1d466b !important;
}

.app-bar-visible {
  animation: slideUP 0.3s ease-in-out;
}

/* App bar styling */
.v-app-bar {
  padding: 0 24px;
}

@media (max-width: 960px) {
  .v-app-bar {
    padding: 0 16px;
  }
}

@media (max-width: 600px) {
  .v-app-bar {
    padding: 0 12px;
  }
}

@keyframes slideUP {
  from {
    transform: translateY(-50%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Logo hover effects */
.logo-container {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  min-height: 80px;
  background-color: transparent;
}

.logo-hovered {
  filter: drop-shadow(0 0 8px rgba(193, 209, 225, 0.6));
  transform: scale(1.05);
}

/* Ensure logo is always visible */
.logo-container .v-img {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

/* Description content styling */
.description-text {
  white-space: pre-line;
}

.description-text br {
  margin-bottom: 0.5rem;
}


/* Additional global override for links in description */
:deep(.description-text a) {
  color: #b0b0b0 !important;
  text-decoration: none !important;
}

:deep(.description-text a:hover) {
  color: #b0b0b0 !important;
}

:deep(.description-text a:visited) {
  color: #b0b0b0 !important;
}




/* Responsive adjustments */
@media (max-width: 960px) {
  .expanded-header {
    min-height: 300px;
  }

  .header-container {
    padding: 0 16px;
  }

  .left-column,
  .right-column {
    padding: 24px !important;
  }

  .description-text {
    margin-top: 16px;
  }
}

@media (max-width: 600px) {
  .expanded-header {
    min-height: 250px;
  }

  .header-container {
    padding: 0 12px;
  }

  .left-column,
  .right-column {
    padding: 16px !important;
  }
}

.smooth-text {
  transition: all 0.3s ease;
}
</style>