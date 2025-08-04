# UI Components

This directory contains reusable UI components for the CHETNA website.

## Components

### MethodAnimation.vue
A GSAP-powered animation component that demonstrates the CHETNA methodology through a 4-step animation sequence.

**Features:**
- **Step 1**: E1 (City-wise Emission Modeling title), E4, E5, E6 (description elements) fade in
- **Step 2**: E2 (Public Available Data) fades in
- **Step 3**: E3 (Scenario Analysis & Mitigation Policy) fades in
- **Step 4**: Complex transition where:
  - E1, E2, E3 fade out
  - E4, E5, E6 move to screen center with bounce animation
  - Title changes from "CHETNA Goal" to "CHETNA Strategy"

**Usage:**
```vue
<template>
  <MethodAnimation />
</template>
```

**Animation Controls:**
- Start Animation: Triggers the complete animation sequence
- Reset: Returns to initial state

**Dependencies:**
- GSAP (v3.13.0) for animations
- Vue 3 with Composition API

**Responsive Design:**
- Adapts to different screen sizes
- Mobile-optimized layout and animations

### Other Components
- AppFooter.vue
- AppHeader.vue
- CarouselContent.vue
- ColorPalette.vue
- DisclaimerPopup.vue
- FooterColumn1.vue
- FooterColumn2.vue
- FooterColumn3.vue
- LogoStatus.vue
- ProgressLoader.vue
- ProjectTitle.vue
- TeamMemberCard.vue
- TeamSection.vue
- TimelineComponent.vue 