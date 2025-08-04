<template>
  <v-footer class="bg-primary-3 text-white">
    <!-- Main Footer Content -->
    <v-container class="py-8 mx-15 px-15">
      <v-row>
        <!-- First Column: Logo, Slogan, Social Icons, Copyright -->
        <FooterColumn1 @show-disclaimer="showDisclaimer = true" />

        <!-- Second Column: Navigation Links -->
        <FooterColumn2 />

        <!-- Third Column: Project Info and Logos -->
        <FooterColumn3 />
      </v-row>
    </v-container>
    
    <!-- Disclaimer Popup -->
    <DisclaimerPopup v-model="showDisclaimer" />
  </v-footer>
</template>

<script setup>
/**
 * AppFooter component with three-column layout using separate components:
 * 1. FooterColumn1 - Logo, slogan, social icons, copyright
 * 2. FooterColumn2 - Navigation links
 * 3. FooterColumn3 - Project info, team logos, designer credit
 */

import { ref } from 'vue'
import DisclaimerPopup from './DisclaimerPopup.vue'
import FooterColumn1 from './FooterColumn1.vue'
import FooterColumn2 from './FooterColumn2.vue'
import FooterColumn3 from './FooterColumn3.vue'

// Reactive data
const showDisclaimer = ref(false)
</script>

<style scoped>
/* Footer container styles - no specific styling needed as it's handled by child components */
</style> 