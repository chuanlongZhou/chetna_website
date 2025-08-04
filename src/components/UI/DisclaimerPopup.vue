<template>
  <v-dialog v-model="dialog" max-width="600" persistent>
    <v-card class="disclaimer-card">
      <!-- Header -->
      <v-card-title class="d-flex align-center justify-space-between pa-4">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-information</v-icon>
          <span class="text-h6 font-weight-bold text-primary">DISCLAIMER</span>
        </div>
        <v-btn
          icon
          variant="text"
          color="primary"
          @click="closeDialog"
          class="close-btn"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      
      <!-- Divider -->
      <v-divider class="mx-4" style="background-color: #e0e0e0;"></v-divider>
      
      <!-- Content -->
      <v-card-text class="pa-4">
        <p class="text-body-1 text-primary disclaimer-text">
          CHETNA data are made freely available to the public with a fair use open data policy. 
          In the process of updating our daily CO<sub>2</sub> emission products, 
          errors may be corrected, revisions may be made in the calculation methods, and new information may be used. 
          Data files available for download and graphs are associated to a day of release. 
          In case of questions regarding data and history previous releases, please contact us at 
          <a href="mailto:chuanlong.zhou@lsce.ipsl.fr" class="text-decoration-underline">chuanlong.zhou@lsce.ipsl.fr</a>. 
          All information displayed and provided can be used at the own responsibility of users, 
          and does not engage any responsibility from research institutions supporting CHETNA and partner institutions.
        </p>
      </v-card-text>
      
      <!-- Actions -->
      <v-card-actions class="pa-4 pt-0">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="outlined"
          @click="closeDialog"
          class="text-none"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
/**
 * DisclaimerPopup component displays a modal with disclaimer information
 * about Carbon Monitor data usage and policies
 */

import { ref, computed } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Computed property for v-model
const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Methods
const closeDialog = () => {
  dialog.value = false
}
</script>

<style scoped>
.disclaimer-card {
  border-radius: 8px;
}

.disclaimer-text {
  line-height: 1.6;
  text-align: justify;
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.text-decoration-underline {
  text-decoration: underline;
}
</style> 