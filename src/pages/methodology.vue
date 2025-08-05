<template>
  <v-container class="fill-height" max-width="1200">
    <div>
      <div class="mb-8 text-center">
        <p class="text-h4 font-weight-bold mt-4 mb-10" style="color: #2F3E4E;">
          Large Data Sets, Advanced Models, and Artificial Intelligence
        </p>
      </div>

      <!-- Method Animation Section -->
      <v-row justify="center" class="mb-8">
        <v-col cols="12">
          <MethodAnimation />
        </v-col>
      </v-row>

      <v-row justify="center" class="mb-0">
        <v-col cols="12">
          <MethodAnimation2 />
        </v-col>

        <v-divider class="mb-5"></v-divider>
          <!-- add  "A Pivotal Decade for India's Energy and Climate Future" as conslusion of this page-->
          <div class="text-center">
            <p class="text-h4 font-weight-normal mb-15 mt-5" style="color: #2F3E4E;">
              Next-Generation Framework Integrating Cutting-Edge Data, Models, and AI
            </p>
          </div>

      </v-row>
    </div>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MethodAnimation from '../components/UI/method_animation.vue'
import MethodAnimation2 from '../components/UI/method_animation2.vue'

/**
 * Methodology page component
 * Displays research methodology and animation
 */
</script> 