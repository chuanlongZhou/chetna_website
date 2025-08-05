<template>
  <v-card class="mb-6" elevation="2" style="max-height: 300px;">
    <v-card-title class="text-body-1 font-weight-bold py-1" style="color: white; background-color: #24597e;">
      Gallery
    </v-card-title>
    <v-card-text class="pa-5" style="max-height: 250px; overflow-y: auto;">
      <v-row>
        <v-col 
          v-for="(image, index) in galleryImages" 
          :key="index"
          cols="4"
          class="pa-1"
        >
          <v-img
            :src="image"
            height="80"
            cover
            class="rounded"
            style="cursor: pointer;"
            @click="openImageDialog(image)"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <!-- Image Dialog -->
  <v-dialog v-model="showImageDialog" fullscreen>
    <v-card class="d-flex flex-column" style="height: 100vh;">
      <v-card-title class="text-h6 d-flex align-center justify-space-between">
        <span>Gallery Image ({{ currentImageIndex + 1 }} of {{ galleryImages.length }})</span>
        <v-btn icon @click="showImageDialog = false" size="small">
          <v-icon sd>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-0 flex-grow-1 d-flex align-center justify-center position-relative" style="background-color: rgba(0,0,0,0.9);">
        <!-- Previous Button -->
        <v-btn
          v-if="currentImageIndex > 0"
          icon
          size="large"
          color="white"
          class="position-absolute"
          style="left: 20px; z-index: 10;"
          @click="previousImage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        
        <!-- Next Button -->
        <v-btn
          v-if="currentImageIndex < galleryImages.length - 1"
          icon
          size="large"
          color="white"
          class="position-absolute"
          style="right: 20px; z-index: 10;"
          @click="nextImage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        
        <v-img
          v-if="selectedImage"
          :src="selectedImage"
          contain
          class="ma-4"
          style="max-width: 95vw; max-height: 90vh;"
        ></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '@/stores/app'

/**
 * Gallery component
 * Displays a grid of gallery images with fullscreen viewer and navigation
 */

const appStore = useAppStore()

// Gallery images - loop from totalGalleryImages to 1
const totalGalleryImages = computed(() => appStore.totalGalleryImages)
const galleryImages = computed(() => {
  const images = []
  for (let i = totalGalleryImages.value; i >= 1; i--) {
    images.push(new URL(`../../assets/gallery/${i}.png`, import.meta.url).href)
  }
  return images
})

// Image dialog functionality
const selectedImage = ref(null)
const showImageDialog = ref(false)
const currentImageIndex = ref(0)

/**
 * Open image dialog and set current index
 * @param {string} image - The image URL to display
 */
const openImageDialog = (image) => {
  selectedImage.value = image
  // Find the index of the clicked image
  const index = galleryImages.value.findIndex(img => img === image)
  currentImageIndex.value = index >= 0 ? index : 0
  showImageDialog.value = true
}

/**
 * Navigate to previous image
 */
const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    selectedImage.value = galleryImages.value[currentImageIndex.value]
  }
}

/**
 * Navigate to next image
 */
const nextImage = () => {
  if (currentImageIndex.value < galleryImages.value.length - 1) {
    currentImageIndex.value++
    selectedImage.value = galleryImages.value[currentImageIndex.value]
  }
}
</script> 