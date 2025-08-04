<template>
  <v-container class="fill-height" max-width="1200">
    <div>
      <div class="mb-8 text-center">
        <p class="text-h4 font-weight-bold mt-4" style="color: #2F3E4E;">
          Meet our team of researchers, data providers, and collaborators
        </p>
      </div>

      <v-row>
        <v-col cols="12">
          <!-- Team Section -->
          <TeamSection :team-members="teamMembers" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
/**
 * People page component
 * Displays information about the organization and team
 */

import { ref, onMounted } from 'vue'
import TeamSection from '../components/UI/TeamSection.vue'

// Reactive data
const teamMembers = ref([])

// Import team data
import teamData from '../assets/team.json'

// Methods
const loadTeamData = () => {
  teamMembers.value = teamData
}

// Lifecycle
onMounted(() => {
  loadTeamData()
})
</script> 