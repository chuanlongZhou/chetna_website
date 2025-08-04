<template>
  <AppHeader />
  
  <v-main :class="{ 'main-with-expanded-header': !isScrolled }">
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script setup>
  // Import the AppHeader and AppFooter components from UI subfolder
  import AppHeader from '@/components/UI/AppHeader.vue'
  import AppFooter from '@/components/UI/AppFooter.vue'
  import { ref, onMounted, onUnmounted } from 'vue'

  const isScrolled = ref(false)

  // Scroll detection for layout adjustments
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 100
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<style scoped>
.main-with-expanded-header {
  margin-top: 0;
}

/* Ensure smooth transitions */
.v-main {
  transition: margin-top 0.3s ease;
}
</style>
