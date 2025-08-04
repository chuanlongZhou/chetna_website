<template>
  <div class="carousel-content">
    <!-- Carousel -->
    <v-carousel
      v-model="currentIndex"
      hide-delimiter-background
      :show-arrows="false"
      height="400"
      cycle
      class="carousel-container"
      @click="handleCarouselClick"
    >
      <v-carousel-item
        v-for="(item, index) in carouselItems"
        :key="index"
        class="carousel-item"
        cover
      >
        <!-- Combined Content Item -->
        <v-card
          class="carousel-card"
          elevation="0"
          color="transparent"
          @click="handleItemClick(item)"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <!-- Title -->
          <v-card-title 
            v-if="item.title" 
            class="text-h6 font-weight-bold text-white pa-0 mb-2"
          >
            {{ item.title }}
          </v-card-title>

          <!-- Date -->
          <v-card-subtitle 
            v-if="item.date" 
            class="pa-0 mb-3"
          >
            <span class="text-grey-lighten-3 text-caption">{{ item.date }}</span>
          </v-card-subtitle>

          <!-- Description 1 (Above Image) -->
          <v-card-text 
            v-if="item.description1" 
            class="pa-0 mb-4"
          >
            <p class="text-body-2 text-white">{{ item.description1 }}</p>
          </v-card-text>

          <!-- Image -->
          <div 
            v-if="item.image" 
            class="image-container mb-4"
          >
            <v-img
              :src="item.image"
              :alt="item.imageAlt || item.description1 || item.description2 || item.title"
              :height="item.imageHeight || defaultImageHeight"
              cover
              class="carousel-image"
            />
          </div>
          
          <!-- Description 2 (Below Image) -->
          <v-card-text 
            v-if="item.description2" 
            class="pa-0 mb-4"
          >
            <p class="text-body-2 text-white">{{ item.description2 }}</p>
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>

    <!-- Custom Navigation Dots -->
    <!-- <div class="d-flex justify-center mt-4">
      <v-btn
        v-for="(item, index) in carouselItems"
        :key="index"
        :icon="index === currentIndex ? 'mdi-circle' : 'mdi-circle-outline'"
        variant="text"
        size="small"
        color="white"
        class="mx-1"
        @click="currentIndex = index"
      />
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const currentIndex = ref(0)
const defaultImageHeight = 275

// Get carousel items from the app store
const carouselItems = computed(() => appStore.carouselItems)

// Handle carousel click
const handleCarouselClick = () => {
  // This can be used for additional carousel click handling if needed
}

// Handle item click - navigate to link if provided
const handleItemClick = (item) => {
  if (item.link) {
    // Check if it's an external link (starts with http)
    if (item.link.startsWith('http')) {
      window.open(item.link, '_blank')
    } else {
      // Internal navigation - you can use router here if needed
      window.open(item.link, '_blank')
    }
  }
}

// Handle hover effects
const handleMouseEnter = (event) => {
  const card = event.currentTarget
  card.style.transform = 'translateY(-4px)'
  card.style.transition = 'all 0.3s ease'
}

const handleMouseLeave = (event) => {
  const card = event.currentTarget
  card.style.transform = 'translateY(0)'
}
</script>

<style scoped>
.carousel-content {
  width: 100%;
}

.carousel-container {
  background: transparent !important;
}

.carousel-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(10px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  cursor: pointer;
}

.carousel-card:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.carousel-image {
  border-radius: 8px;
  overflow: hidden;
}

.image-container {
  position: relative;
}

/* Custom navigation dots */
.v-btn--icon {
  transition: all 0.3s ease;
}

.v-btn--icon:hover {
  transform: scale(1.2);
}
</style> 