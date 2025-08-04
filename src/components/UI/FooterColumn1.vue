<template>
  <v-col cols="12" md="4" class="mb-6 mb-md-0" align="center">
    <div class="d-flex flex-column h-100">
      <!-- Logo and Name -->
      <div class="mb-4">
        <v-img src="@/assets/CHETNA.svg" alt="CHETNA Logo" max-width="75" max-height="75" contain class="mb-2" />
        <h3 class="text-h6 font-weight-bold">CHETNA</h3>
        <h3 class="text-h6 font-weight-thin">Emissions for 100 Indian Cities</h3>
      </div>

      <!-- Slogan -->
      <p class="text-body-2 text-grey-lighten-1 mb-4">
        Slogan for this project
      </p>

      <!-- Social Icons -->
      <div class="d-flex justify-center align-center mb-4">
        <v-btn href="https://github.com/chuanlongZhou/indian_100_data" target="_blank" icon variant="text" color="white"
          class="social-btn mr-2">
          <v-icon size="x-large">mdi-github</v-icon>
        </v-btn>
        <v-btn href="mailto:chuanlong.zhou@lsce.ipsl.fr" variant="text" color="white" icon class="social-btn mr-2">
          <v-icon size="large">mdi-email</v-icon>
        </v-btn>
        <v-btn variant="plain" color="white" class="social-btn d-flex align-center pl-2 pr-3"
          @click="$emit('show-disclaimer')">
          <v-icon size="x-large" class="mr-2">mdi-information</v-icon>
          Disclaimer & How to use
        </v-btn>
      </div>

    </div>
  </v-col>
</template>

<script setup>
/**
 * FooterColumn1 component - Logo, slogan, social icons, and copyright
 * Emits: show-disclaimer
 */

defineEmits(['show-disclaimer'])
</script>

<style scoped>
/* Social buttons styling - white icons without background */
.social-btn {
  background: transparent !important;
  box-shadow: none !important;
}

.social-btn:hover {
  background-color: white !important;
  color: #0c549c !important;
}

/* Disclaimer button styling */
.disclaimer-btn {
  background: transparent !important;
  box-shadow: none !important;
  text-transform: none !important;
  font-weight: normal !important;
}

.disclaimer-btn:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>