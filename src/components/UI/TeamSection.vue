<template>
  <div class="team-section">
    <!-- Team Logos and Descriptions -->
    <div class="team-logos-section mb-8">
      <v-row>
        <v-col v-for="team in teams" :key="team.name" cols="12" sm="6" md="3" class="mb-8">
          <v-card 
            class="team-logo-card text-center" 
            elevation="2"
            @click="scrollToTeam(team.name)"
            style="cursor: pointer;"
          >
            <v-card-text class="pa-4">
              <!-- Single Logo Display -->
              <p class="text-body-2 mt-1" style="color: #2F3E4E;">{{ team.description }}</p>

              <div v-if="!team.isMultiLogo">
                <v-img 
                  :src="team.logoSrc" 
                  :alt="team.name"
                  height="80"
                  contain
                  class="mt-2"
                />
              </div>
              
              <!-- <h3 class="text-h6 font-weight-bold" style="color: #1E324F;">{{ team.name }}</h3> -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Team Members by Institute -->
    <div class="team-members-section">
      
      <div v-for="(members, institute) in groupedMembers" :key="institute" class="institute-section mb-8" :id="`team-${getTeamId(institute)}`">
        <h3 class="text-h6 font-weight-bold mb-4" style="color: #2F3E4E;">
          {{ getInstituteDisplayName(institute) }}
        </h3>
        
        <!-- Team Description -->
        <div class="team-description mb-6">
          <p class="text-body-1" style="color: #2F3E4E;">{{ getTeamDescription(institute) }}</p>
        </div>
        
        <v-row>
          <v-col 
            v-for="member in members" 
            :key="member.name" 
            cols="12" 
            sm="6" 
            md="4"
          >
            <TeamMemberCard :member="member" />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Team Section Component
 * Displays team logos and organizes team members by institute
 */

import { computed } from 'vue'
import { useAppStore } from '../../stores/app.js'
import TeamMemberCard from './TeamMemberCard.vue'

// Import logo images
import lsceLogo from '../../assets/logo/lsce.png'
import iitLogo from '../../assets/logo/iit.png'
import nexqtLogo from '../../assets/logo/nexqt.png'
import granthamLogo from '../../assets/logo/grantham-foundation-h-ko.png'

// Props
const props = defineProps({
  teamMembers: {
    type: Array,
    required: true
  }
})

// Store
const appStore = useAppStore()

// Computed properties
const teams = computed(() => {
  return [
    {
      name: 'LSCE',
      description: 'Global leading climate and environmental research',
      logoSrc: lsceLogo,
      isMultiLogo: false
    },
    {
      name: 'IIT Bombay',
      description: 'Leading engineering and technology institution in India',
      logoSrc: iitLogo,
      isMultiLogo: false
    },
    {
      name: 'Nexqt',
      description: 'Urban decarbonization and data solutions',
      logoSrc: nexqtLogo,
      isMultiLogo: false
    },
    {
      name: 'Grantham Foundation',
      description: 'Climate and environmental action and funding',
      logoSrc: granthamLogo,
      isMultiLogo: false,
    }
  ]
})

const groupedMembers = computed(() => {
  const groups = {
    'LSCE': [],
    'IIT Bombay': [],
    'Nexqt': [],
    'Other Collaborators': []
  }
  
  props.teamMembers.forEach(member => {
    let group = 'Others'
    
    if (member.institute === 'LSCE') {
      group = 'LSCE'
    } else if (member.institute === 'IIT Bombay') {
      group = 'IIT Bombay'
    } else if (member.institute === 'Nexqt') {
      group = 'Nexqt'
    } else {
      group = 'Other Collaborators'
    }
    
    groups[group].push(member)
  })
  
  // Maintain original JSON order within each group
  // No sorting needed - keep the order as it appears in the JSON file
  
  // Only return groups that have members
  const filteredGroups = {}
  Object.keys(groups).forEach(key => {
    if (groups[key].length > 0) {
      filteredGroups[key] = groups[key]
    }
  })
  
  return filteredGroups
})

// Methods
const getInstituteDisplayName = (institute) => {
  const displayNames = {
    'LSCE': 'Laboratoire des Sciences du Climat et de l\'Environnement (LSCE)',
    'IIT Bombay': 'Indian Institute of Technology Bombay',
    'Nexqt': 'Nexqt',
    'Others': 'Other Partners'
  }
  
  return displayNames[institute] || institute
}

const getTeamDescription = (institute) => {
  return appStore.teamDescriptions[institute] || appStore.teamDescriptions['Others']
}

const getTeamId = (institute) => {
  const teamIds = {
    'LSCE': 'lsce',
    'IIT Bombay': 'iit-bombay',
    'Nexqt': 'nexqt',
    'Others': 'other-partners'
  }
  return teamIds[institute] || 'other-partners'
}

const scrollToTeam = (teamName) => {
  const teamId = getTeamId(teamName)
  const element = document.getElementById(`team-${teamId}`)
  if (element) {
    // Add offset for better positioning
    const offset = 150
    const elementTop = element.offsetTop
    const targetScrollPosition = elementTop - offset

    // Get current scroll position
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop

    // Calculate how much pixel need to be scrolled
    const pixelsToScroll = targetScrollPosition - currentScroll

    // If already at target position, no need to scroll
    if (Math.abs(pixelsToScroll) < 5) {
      return
    }

    // Calculate dynamic animation duration based on scroll distance
    const baseDuration = 300 // base duration for short scrolls
    const maxDuration = 600 // maximum duration for long scrolls
    const scrollDistance = Math.abs(pixelsToScroll)
    
    // Dynamic duration: longer distance = longer duration, but with limits
    const animationDuration = Math.min(
      Math.max(baseDuration, scrollDistance * 0.5), // 0.5ms per pixel
      maxDuration
    )
    
    const stepInterval = 16 // ~60fps
    const totalSteps = Math.ceil(animationDuration / stepInterval)
    const stepSize = pixelsToScroll / totalSteps

    console.log('Scroll info:', {
      currentScroll,
      targetScrollPosition,
      pixelsToScroll,
      stepSize,
      totalSteps
    })

    let currentStep = 0
    const scrollInterval = setInterval(() => {
      currentStep++
      
      // Get current scroll position
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop
      
      // Check if we've reached the target or bottom of page
      const isAtTarget = Math.abs(currentScrollPos - targetScrollPosition) < 5
      const isAtBottom = currentScrollPos + window.innerHeight >= document.documentElement.scrollHeight
      
      if (isAtTarget || isAtBottom || currentStep >= totalSteps) {
        // Final positioning to ensure exact target
        window.scrollTo(0, targetScrollPosition)
        clearInterval(scrollInterval)
        return
      }
      
      // Perform the scroll step
      window.scrollBy(0, stepSize)
    }, stepInterval)
  }
}
</script>

<style scoped>
.team-section {
  width: 100%;
}

.team-logo-card {
  height: 180px;
  transition: all 0.3s ease;
}

.team-logo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.institute-section {
  margin-bottom: 3rem;
}

.team-description {
  background-color: #F5F6FA;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #1E324F;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .team-logo-card {
    height: 180px;
  }
}
</style> 