<template>
  <v-col cols="12" md="2" class="mb-6 mb-md-0">
    <div class="flex-column h-100">
      <v-btn
        variant="plain"
        color="white"
        class="text-h6 font-weight-bold mb-5 d-flex align-center justify-start top-btn"
        @click="scrollToTop"
      >
        <v-icon class="mr-2">mdi-arrow-up-bold</v-icon>
        Move to Top
      </v-btn>
      <v-divider class="my-4"></v-divider>
      <div class="d-flex flex-column">
        <router-link
          v-for="item in navigationItems"
          :key="item.title"
          :to="item.to"
          :class="[
            'text-body-2 text-white text-decoration-none mb-2 hover-link',
            item.title === 'City Data' ? 'city-data-link' : ''
          ]"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </v-col>
</template>

<script setup>
/**
 * FooterColumn2 component - Navigation links and scroll to top
 */

// Methods
const scrollToTop = () => {
  // Get the current scroll position
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop
  
  // Calculate scroll step for smooth animation (400ms duration)
  const scrollStep = currentScroll / 20 // 20 steps over 400ms = 20ms per step
  
  const scrollInterval = setInterval(() => {
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop
    
    if (currentPosition > 0) {
      window.scrollBy(0, -scrollStep)
    } else {
      clearInterval(scrollInterval)
      // Ensure we're exactly at the top
      window.scrollTo(0, 0)
    }
  }, 20)
}

const navigationItems = [
  {
    title: 'City Data',
    to: '/'
  },
  {
    title: 'Facts of India',
    to: '/facts'
  },
  {
    title: 'Methodology',
    to: '/methodology'
  },
  {
    title: 'Who We Are',
    to: '/people'
  },
  {
    title: 'News',
    to: '/news'
  }
]
</script>

<style scoped>
/* Top button styling */
.top-btn {
  background: transparent !important;
  box-shadow: none !important;
  text-transform: none !important;
  font-weight: bold !important;
  padding: 0 !important;
  min-height: auto !important;
  height: auto !important;
}

.top-btn:hover {
  transform: translateY(-1px);
}

.hover-link {
  transition: all 0.3s ease;
}

.hover-link:hover {
  color: rgba(255, 255, 255, 0.8) !important;
  transform: translateX(4px);
}

/* City Data link highlighting */
.city-data-link {
  color: #aede9b !important; /* Gold color for highlighting */
  font-weight: bold !important;
  position: relative;
}

.city-data-link::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 16px;
  background: #aede9b;
  border-radius: 2px;
}

.city-data-link:hover {
  color: #aede9b !important; /* Lighter gold on hover */
  transform: translateX(4px);
}
</style> 