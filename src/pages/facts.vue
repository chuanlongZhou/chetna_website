<template>
  <v-container class="fill-height" max-width="1200">
    <div class="mb-15">
      <div class="mb-8 text-center">
        <p class="text-h4 font-weight-bold mt-4" style="color: #2F3E4E;">
          Discover the facts, challenges, and opportunities of India's energy and GHG emissions
        </p>
      </div>

      <!-- Fact Row Examples -->
      
            <!-- Example 3: Economic Growth (Text left, Chart right) -->
        <FactRow
        :left-figure="false"
        paragraph-title="India - Key Player in the Fight Against Climate Change"
        paragraph-text="India's CO₂ emissions are rising as the country undergoes rapid economic and urban growth, recently surpassing the EU to become the world’s third-largest emitter. While historical emissions remain low on a per capita basis, India's future trajectory will significantly impact global climate goals."
        leading-icon="mdi-trending-up"
        :data-url="energyDataUrl"
        date-column="Year"
        :data-columns="country_data"
        x-ticks="yearly"
        y-label="Mt"
        :scatter-interval="5"
        chart-title=""
        panelTitle="Energy Demand"
        unit="Mt"
        themeColor="#1D466B"
        :x-tick-interval="5"
      />
      <v-divider class="my-10"></v-divider>
      <!-- Example 1: Urban Growth (Text left, Chart right) -->
      <FactRow
        :left-figure="false"
        paragraph-title="India's Population - Rapid Urbanization"
        paragraph-text="India's population will exceed 1.6 billion by 2050, and India's urban population is projected to triple by then, transforming energy and emissions landscapes through rapidly growing energy demand and urban infrastructure expansion."
        leading-icon="mdi-home-city"
        :data-url="populationDataUrl"
        date-column="Year"
        :data-columns="urbanGrowthColumns"
        x-ticks="yearly"
        y-label="millions"
        :scatter-interval="5"
        chartTitle=""
        panelTitle="Population"
        themeColor="#275f91"
        unit="millions"
        :x-tick-interval="5"
        chart-type="bar"
        bar-type="overlay"
        bar-direction="vertical"
      />
      <v-divider class="my-10"></v-divider>
      <!-- Example 2: Energy Transition (Chart left, Text right) -->
      <FactRow
        :left-figure="true"
        paragraph-title="India's Energy Mix — Coal Leads the Way"
        paragraph-text="Coal continues to dominate India’s energy mix, with per capita coal consumption rising sharply since 2000. While bioenergy and oil remain significant, their growth has been slower. Despite recent efforts to expand renewables, sources like solar, wind, and hydro contribute only marginally to overall energy use. This heavy reliance on fossil fuels underscores both the urgency and the scale of India’s clean energy transition."
        leading-icon="mdi-lightning-bolt-circle"
        :data-url="energyPerCapitaDataUrl"
        date-column="Year"
        :data-columns="energyColumns"
        x-ticks="yearly"
        y-label="GJ/capita"
        :scatter-interval="5"
        chartTitle=""
        panelTitle="Energy Consumption"
        themeColor="#735642"
        unit="GJ/capita"
        :x-tick-interval="5"
      />
      <v-divider class="my-10"></v-divider>
      <FactRow
        :left-figure="true"
        paragraph-title="India's Emissions Factors — Rising Energy Carbon Intensity"
        paragraph-text="The CO₂ emitted per unit of energy (CO₂/Energy) has increased steadily since 2000, reflecting a shift toward more carbon-heavy fuels like coal. This means even as India uses energy more efficiently, each unit of energy results in more emissions—posing a major challenge for decarbonization and making clean energy transitions more urgent than ever."
        leading-icon="mdi-key-outline"
        :data-url="kayaDataUrl"
        date-column="Year"
        :data-columns="kayaColumns"
        x-ticks="yearly"
        y-label="%"
        :scatter-interval="5"
        themeColor="#404040"
        chart-title=""
        panelTitle="Kaya Decomposition of Emissions"
        unit="%"
        :x-tick-interval="5"
      />
      <v-divider class="my-10"></v-divider>
      <!-- add  "A Pivotal Decade for India's Energy and Climate Future" as conslusion of this page-->
      <div class="text-center">
        <p class="text-h4 font-weight-bold mt-15" style="color: #2F3E4E;">
          A Pivotal Decade for Energy and Climate Future with India's Action
        </p>
      </div>

    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import TimeSeriesPlot from '../components/viz/TimeSeriesPlot.vue'
import FactRow from '../components/fact_row.vue'

// Computed properties for data URLs
const energyDataUrl = computed(() => new URL('../assets/india_fact_data/20_total_IND_withForecast_data.csv', import.meta.url).href)
const populationDataUrl = computed(() => new URL('../assets/india_fact_data/India_data.csv', import.meta.url).href)
const energyPerCapitaDataUrl = computed(() => new URL('../assets/india_fact_data/22_EnergyLines_wBio_IND_EJ_percapita_data.csv', import.meta.url).href)
const kayaDataUrl = computed(() => new URL('../assets/india_fact_data/60_KayaFigures_IND_relative_data.csv', import.meta.url).href)

/**
 * Facts of India page component
 * Displays interesting facts about India's geography, culture, and achievements
 */

// Energy data configuration
const energyColumns = ref({
  'Coal': '#735642',
  'Oil': '#404040',
  'Bioenergy': '#EEC17C',
  'Gas': '#7498C2',
  'Hydro': '#83BFA7',
  'Solar': '#DBC498',
  'Wind': '#F4D959',
  'Nuclear': '#E79872',
  // 'Biofuels': '#AAB4D3',
  // 'Other': '#D691C0'
})

// Urban growth data configuration
const urbanGrowthColumns = ref({
  'Population': '#1976D2',
  'Urban Population': '#e3594f',
})

// Energy transition data configuration
const energyTransitionColumns = ref({
  'Coal': '#735642',
  'Oil': '#404040',
  'Gas': '#7498C2',
  'Cement': '#83BFA7'
})

const kayaColumns = ref({
  // 'GDP': '#E79872',
  // 'Fossil CO₂': '#404040',
  'CO₂/Energy': '#AAB4D3',
  'Energy/GDP': '#83BFA7'
})

// Economic growth data configuration
const economicGrowthColumns = ref({
  'GDP Growth': '#1976D2',
  'Energy Demand': '#D32F2F',
  'Urbanization': '#388E3C'
})

const country_data = ref({
  'Inida': '#388E3C',
  'China': '#9240b3',
  'EU27': '#1976D2',
  'USA': '#D32F2F',
})

</script> 