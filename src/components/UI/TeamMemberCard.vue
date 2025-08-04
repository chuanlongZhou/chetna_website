<template>
  <v-card 
    class="team-member-card" 
    :elevation="isHovered ? 8 : 2"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :class="{ 'card-hovered': isHovered }"
    :style="{ backgroundColor: isHovered ? '#2f71ad' : '#ffffff' }"
  >
    <!-- Top Section -->
    <div class="card-top-section">
      <div class="member-info">
        <v-avatar 
          size="80" 
          class="member-avatar"
          :class="{ 'avatar-hovered': isHovered }"
        >
          <v-img 
            :src="avatarSrc" 
            :alt="member.name"
            cover
          />
        </v-avatar>
        
        <div class="member-details">
          <h6 class="member-name">{{ member.name }}</h6>
          <p class="member-title">{{ member.title }}</p>

          <!-- Social Icons -->
          <div class="social-icons">
            <v-btn 
              v-if="member.email"
              icon 
              size="small" 
              variant="text"
              :href="`mailto:${member.email}`"
              target="_blank"
              class="social-icon"
            >
              <v-icon size="18">mdi-email</v-icon>
            </v-btn>
            <v-btn 
              v-if="member.homeUrl"
              icon 
              size="small" 
              variant="text"
              :href="member.homeUrl"
              target="_blank"
              class="social-icon"
            >
              <v-icon size="18">mdi-home</v-icon>
            </v-btn>
            <v-btn 
              v-if="member.scholarUrl"
              icon 
              size="small" 
              variant="text"
              :href="member.scholarUrl"
              target="_blank"
              class="social-icon"
            >
              <v-icon size="18">mdi-school</v-icon>
            </v-btn>
            <v-btn 
              v-if="member.githubUrl"
              icon 
              size="small" 
              variant="text"
              :href="member.githubUrl"
              target="_blank"
              class="social-icon"
            >
              <v-icon size="18">mdi-github</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Separator -->
    <v-divider class="mx-3"></v-divider>

    <!-- Bottom Section -->
    <div class="card-bottom-section">
      <div 
        class="description-wrapper"
        :style="{ maxHeight: wrapperHeight }"
        ref="descriptionRef"
      >
        <p class="member-description">
          {{ member.description || 'No description available.' }}
        </p>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  member: {
    type: Object,
    required: true
  }
})

const isHovered = ref(false)
const descriptionRef = ref(null)
const wrapperHeight = ref('80px') // collapsed height

const avatarSrc = computed(() => {
  try {
    return new URL(`../../assets/people_avtar/${props.member.photo}`, import.meta.url).href
  } catch (error) {
    console.warn(`Failed to load avatar for ${props.member.name}:`, error)
    return ''
  }
})

// Watch for hover and dynamically update height
watch(isHovered, (val) => {
  const el = descriptionRef.value
  if (!el) return

  if (val) {
    wrapperHeight.value = `${el.scrollHeight}px`
  } else {
    wrapperHeight.value = '80px'
  }
})
</script>

<style scoped>
.team-member-card {
  min-height: 280px;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.card-hovered {
  transform: translateY(-4px);
}

.card-top-section {
  padding: 20px;
  transition: background-color 0.3s ease;
}

.member-info {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.member-avatar {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.avatar-hovered {
  transform: scale(1.1);
}

.member-details {
  flex: 1;
  min-width: 0;
}

.member-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1E324F;
  margin: 0 0 4px 0;
  line-height: 1.2;
  transition: color 0.3s ease;
}

.member-title {
  font-size: 0.875rem;
  color: #666666;
  margin: 0 0 12px 0;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.card-hovered .member-name {
  color: #ffffff;
}

.card-hovered .member-title {
  color: #cccccc;
}

.social-icons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.social-icon {
  color: #1E324F;
  transition: color 0.2s ease;
}

.social-icon:hover {
  color: #aeb8c2;
}

.card-hovered .social-icon {
  color: #aeb8c2;
}

.card-hovered .social-icon:hover {
  color: #1E324F;
}

.card-bottom-section {
  padding: 16px 20px;
  transition: all 0.3s ease;
  flex: 1;
  display: flex;
  align-items: flex-start;
}

/* Animated wrapper */
.description-wrapper {
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.member-description {
  font-size: 0.875rem;
  color: #2F3E4E;
  line-height: 1.5;
  margin: 0;
  transition: color 0.3s ease;
}

.card-hovered .member-description {
  color: #e0e0e0;
}

/* Responsive */
@media (max-width: 600px) {
  .team-member-card {
    min-height: 260px;
  }

  .member-info {
    gap: 12px;
  }

  .member-avatar {
    width: 60px !important;
    height: 60px !important;
  }

  .member-name {
    font-size: 1.125rem;
  }

  .member-title {
    font-size: 0.8rem;
  }

  .member-description {
    font-size: 0.8rem;
  }
}
</style>
