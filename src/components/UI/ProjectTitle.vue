<template>
  <div class="project-title-container" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <!-- Main title container with individual letter sliding -->
    <div class="main-title" :class="{ 'title-small': size === 'small', 'expanded': isHovered || externalTrigger }">
      <!-- Individual letters with different slide distances -->
      <span class="title-letter" :class="{ 'slide-c': isHovered || externalTrigger }">C</span>
      <span class="expansion-text expansion-c" :class="{ 'show-expansion': isHovered || externalTrigger }">ity-wise</span>
      <span class="title-letter" :class="{ 'slide-h': isHovered || externalTrigger }">H</span>
      <span class="expansion-text expansion-h" :class="{ 'show-expansion': isHovered || externalTrigger }">igh-resolution</span>
      <span class="title-letter" :class="{ 'slide-e': isHovered || externalTrigger }">E</span>
      <span class="expansion-text expansion-e" :class="{ 'show-expansion': isHovered || externalTrigger }">mission</span>
      <span class="title-letter" :class="{ 'slide-t': isHovered || externalTrigger }">T</span>
      <span class="expansion-text expansion-t" :class="{ 'show-expansion': isHovered || externalTrigger }">racking and</span>
      <span class="title-letter" :class="{ 'slide-n': isHovered || externalTrigger }">N</span>
      <span class="expansion-text expansion-n" :class="{ 'show-expansion': isHovered || externalTrigger }">ationwide</span>
      <span class="title-letter" :class="{ 'slide-a': isHovered || externalTrigger }">A</span>
      <span class="expansion-text expansion-a" :class="{ 'show-expansion': isHovered || externalTrigger }">nalysis</span>
    </div>
  </div>
</template>

<script setup>
/**
 * ProjectTitle component displays the CHETNA acronym with hover expansion
 * Shows "CHETNA" in large bold font and expands to show full acronym meaning on hover
 */

import { ref } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'large',
    validator: (value) => ['large', 'small'].includes(value)
  },
  externalTrigger: {
    type: Boolean,
    default: false
  }
})

const isHovered = ref(false)
</script>

<style scoped>
.project-title-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: all 0.4s ease;
  white-space: nowrap;
}

.main-title {
  display: flex;
  align-items: center;
  font-weight: 900;
  font-size: 2.5rem;
  line-height: 1;
  color: var(--primary-text, #FFFFFF);
  transition: all 0.4s ease;
  position: relative;
}

.main-title.title-small {
  font-size: 1.5rem;
}

.main-title.expanded {
  width: auto;
  min-width: 600px;
}

.title-letter {
  display: inline-block;
  transition: all 0.5s ease;
  transform-origin: center;
  margin-right: 0;
  font-weight: 900;
  letter-spacing: normal;
}

/* Individual letter slide distances and change color on hover*/
.title-letter.slide-c {
  transform: translateX(0rem) ;
}

.title-letter.slide-h {
  transform: translateX(3.4rem) ;
}

.title-letter.slide-e {
  transform: translateX(8.75rem) ;
}

.title-letter.slide-t {
  transform: translateX(12rem) ;
}

.title-letter.slide-n {
  transform: translateX(16.2rem) ;
}

.title-letter.slide-a {
  transform: translateX(20.2rem) ;
}

.expansion-text {
  position: absolute;
  top: 65%;
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;
  white-space: nowrap;
  pointer-events: none;
}

.expansion-text.show-expansion {
  opacity: 1;
  visibility: visible;
}

/* Position each expansion text */
.expansion-c {
  left: 2rem;
}

.expansion-h {
  left: 7rem;
}

.expansion-e {
  left: 13.9rem;
}

.expansion-t {
  left: 18.1rem;
}

.expansion-n {
  left: 24.5rem;
}

.expansion-a {
  left: 30.3rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
  
  .main-title.expanded {
    min-width: 450px;
  }
  
  .expansion-text {
    font-size: 0.7rem;
  }
  
  /* Hide expansion text for tablet */
  .expansion-text {
    display: none;
  }
  
  /* Disable slide effect for tablet */
  .title-letter.slide-h,
  .title-letter.slide-e,
  .title-letter.slide-t,
  .title-letter.slide-n,
  .title-letter.slide-a {
    transform: translateX(0);
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }
  
  .main-title.expanded {
    min-width: 350px;
  }
  
  .expansion-text {
    font-size: 0.6rem;
  }
  
  /* Adjust expansion text positions for mobile */
  .expansion-c {
    left: 1rem;
  }
  
  .expansion-h {
    left: 2rem;
  }
  
  .expansion-e {
    left: 3rem;
  }
  
  .expansion-t {
    left: 4rem;
  }
  
  .expansion-n {
    left: 5rem;
  }
  
  .expansion-a {
    left: 6rem;
  }
  
  /* Further reduced slide distances for mobile */
  .title-letter.slide-h {
    transform: translateX(1rem);
  }
  
  .title-letter.slide-e {
    transform: translateX(2rem);
  }
  
  .title-letter.slide-t {
    transform: translateX(3rem);
  }
  
  .title-letter.slide-n {
    transform: translateX(4rem);
  }
  
  .title-letter.slide-a {
    transform: translateX(5rem);
  }
}

/* Animation for smooth transitions */
@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.expansion-text.show-expansion {
  animation: fadeInSlide 0.5s ease;
}

/*  */
.expansion-text.exit-animation {
  animation: fadeOutSlide 0.05s ease;
}

@keyframes fadeOutSlide {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-20px);
  }
}
</style> 