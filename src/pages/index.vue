<template>
  <v-container class="fill-height" max-width="1200">
    <div>
      <!-- Hero Section -->
      <div class="mb-8">
        <v-row align="center" class="mb-4">
          <v-col cols="12" md="1" class="text-center text-md-left">
            <v-img
              src="@/assets/CHETNA.svg"
              alt="CHETNA Logo"
              width="200"
              height="80"
              class="mx-auto mx-md-0"
              contain
            />
          </v-col>
          <v-col cols="12" md class="text-center text-md-left">
            <h1 class="text-h2 font-weight-bold" style="color: #1E324F;">Welcome to CHETNA 100 Indian Cities</h1>
          </v-col>
        </v-row>
        <p class="text-h6 mt-4 text-center" style="color: #555555;">
          Data-driven research and analysis for understanding India's progress across various sectors
        </p>

      </div>
      <!-- City Scatter Bar Visualization Section -->
      <v-row justify="center" class="mt-6 mb-5">
        <v-col cols="5">
          <CityScatterBar />
        </v-col>
        <v-col cols="7">
          <!-- Toggle Button Group -->
          <v-row justify="end" class="mb-1">
            <v-btn-toggle
              v-model="selectedMode"
              mandatory
              color="#0f3e8a"
              density="compact"
              class="mb-2"
            >
              <v-btn
                value="single"
                size="small"
                variant="outlined"
                prepend-icon="mdi-city"
              >
                Single City
              </v-btn>
              <v-btn
                value="compare"
                size="small"
                variant="outlined"
                prepend-icon="mdi-chart-multiple"
              >
                Compare
              </v-btn>
              <v-btn
                value="brick"
                size="small"
                variant="outlined"
                prepend-icon="mdi-fire"
              >
                Brick Kiln
              </v-btn>
            </v-btn-toggle>
          </v-row>

          <v-divider class="my-4"></v-divider>
          
          <!-- Single City Mode (default) -->
          <transition name="fade-slide" mode="out-in">
            <div v-if="selectedMode === 'single' && !selectedCity" :key="'default'">
              <h3 class="text-h6 mb-2" style="color: #1E324F;"> 100 Cities Total</h3>

              <DataVizTS :comparisonYears="[2020, 2021, 2022]" :max_width="1200" :height="450"/>
            </div>
          </transition>

          <!-- Single City Mode (with selected city) -->
          <transition name="fade-slide" mode="out-in">
            <div v-if="selectedMode === 'single' && selectedCity" :key="selectedCity">
              <h3 class="text-h6 mb-2" style="color: #1E324F;">{{ selectedCity }}</h3>
              <DataVizTS
                :csv-url="`${baseUrl}/summary_time_series/${selectedCity}.csv`"
                :mode="'variation'"
                :selected-columns="['total']"
                :comparisonYears="[2021, 2022]"
                :height="450"
                :enableMap="true"
                :city_name="selectedCity"
              />
            </div>
          </transition>

          <!-- Compare Mode -->
          <transition name="fade-slide" mode="out-in">
            <div v-if="selectedMode === 'compare'" :key="'compare'">
              <!-- First City (if selected) -->
              <div v-if="selectedCity" class="mb-4">
                <h3 class="text-h6 mb-2" style="color: #1E324F;">{{ selectedCity }}</h3>
                <DataVizTS
                  :csv-url="`${baseUrl}/summary_time_series/${selectedCity}.csv`"
                  :mode="'variation'"
                  :selected-columns="['total']"
                  :comparisonYears="[2021, 2022]"
                  :height="450"
                  :enableMap="true"
                  :city_name="selectedCity"
                />
              </div>
            </div>
          </transition>

          <!-- Brick Kiln Mode -->
          <transition name="fade-slide" mode="out-in">
            <div v-if="selectedMode === 'brick'" :key="'brick'">
              <h3 class="text-h6 mb-2" style="color: #1E324F;">Brick Kiln CO₂ Emissions</h3>
              <transition name="scale-fade" appear>
                <GridMapEchart 
                  :csv-url="'https://raw.githubusercontent.com/chuanlongZhou/indian_100_data/refs/heads/main/data/gidded_data/brick_kiln/grid_output.geojson'"
                  :column-name="'CO2'"
                  :height="450"
                />
              </transition>
            </div>
          </transition>
        </v-col>
      </v-row>
      <!-- Additional cities for comparison -->
      <transition-group name="fade-slide" tag="div" v-if="compareCities.length > 0 && selectedMode === 'compare'">
        <v-row :key="'compare-row'">
          <v-col cols="6" v-for="city in compareCities" :key="city">
            <div class="d-flex align-center justify-space-between mb-2">
              <h4 class="text-subtitle-1 mb-0" style="color: #1E324F;">{{ city }}</h4>
              <v-btn
                icon="mdi-close"
                size="small"
                variant="text"
                @click="removeCompareCity(city)"
                class="ml-2"
              >
              </v-btn>
            </div>
            <transition name="scale-fade" appear>
              <DataVizTS
                :csv-url="`${baseUrl}/summary_time_series/${city}.csv`"
                :mode="'variation'"
                :selected-columns="['total']"
                :comparisonYears="[2021, 2022]"
                :height="350"
                :enableMap="true"
                :city_name="city"
              />
            </transition>
          </v-col>
        </v-row>
      </transition-group>
      <v-divider class="my-8"></v-divider>
      <!-- Data Download Component -->
      <DataDownload />

    </div>
  </v-container>
</template>

<script setup>
/**
 * Home page component
 * Displays welcome content, key features, and latest research
 */

import { ref, computed } from "vue";
import { useAppStore } from '@/stores/app.js';
import CityScatterBar from '@/components/viz/city_scatter_bar.vue';
import DataDownload from '@/components/UI/DataDownload.vue';
import DataVizTS from '@/components/viz/DataVizTS.vue';
import GridMapEchart from '@/components/viz/GridMapEchart.vue';

// Get the app store
const appStore = useAppStore();

// Toggle button state
const selectedMode = ref('single');

// Computed properties for city selection
const selectedCity = computed(() => {
    return appStore.selected_city.length > 0 ? appStore.selected_city[0] : '';
});

const compareCities = computed(() => {
    return appStore.selected_city.slice(1); // All cities except the first one
});

// Base URL for data
const baseUrl = 'https://raw.githubusercontent.com/chuanlongZhou/indian_100_data/refs/heads/main/data';

// Function to remove a city from comparison
const removeCompareCity = (cityToRemove) => {
  appStore.removeSelectedCity(cityToRemove);
};
</script>

<style scoped>
/* Fade-slide animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Scale-fade animation for charts and maps */
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.scale-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.scale-fade-enter-to,
.scale-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Smooth transitions for all elements */
* {
  transition: all 0.3s ease;
}
</style>
