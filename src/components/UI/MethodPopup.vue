<template>
    <v-dialog v-model="dialog" max-width="1200" persistent>
        <v-card class="method-popup">
            <!-- Header -->
            <v-card-title class="d-flex justify-space-between align-center px-3 py-1"
                :style="{ backgroundColor: headerColor }" dark>
                <h3 class="text-subtitle-1 font-weight-bold" :style="{ color: titleTextColor }">{{ title }}</h3>
                <v-btn icon @click="closeDialog" :color="titleTextColor" size="small" density="compact">
                    <v-icon size="small">mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <!-- Content -->
            <v-card-text class="pa-0 px-2">
                <v-container fluid class="pa-0">
                    <v-row no-gutters>
                                                 <!-- Left Panel: Cards -->
                         <v-col cols="12" md="3" class="pa-4">
                             <div class="d-flex flex-column" style="gap: 16px;">
                                 <v-card v-for="(card, index) in cards" :key="index" :color="card.color" dark
                                     class="method-card" elevation="4">
                                     <v-card-text class="pa-2">
                                         <div class="d-flex align-start">
                                             <v-icon v-if="card.icon" size="small" class="mr-2 mt-1">{{ card.icon
                                             }}</v-icon>
                                             <div class="flex-grow-1">
                                                 <h5 class="text-subtitle-1 font-weight-bold mb-1">{{ card.title }}</h5>
                                             </div>
                                         </div>
                                         <p class="text-body-2 px-2">{{ card.description }}</p>
                                     </v-card-text>
                                 </v-card>
                             </div>
                         </v-col>
 
                                                  <!-- Right Panel -->
                          <v-col cols="12" md="9" class="pa-0 d-flex align-center">
                              <v-row no-gutters>
                                  <!-- Top Right: Image -->
                                                                     <v-col cols="12" class="pa-4">
                                       <div class="image-container d-flex justify-center align-center" :style="{ backgroundColor: headerColor + 'B3' }">
                                           <v-img :src="imagePath" :alt="title" class="method-image" contain height="400">
                                              <template v-slot:placeholder>
                                                  <div class="d-flex align-center justify-center fill-height">
                                                      <v-progress-circular indeterminate
                                                          color="primary"></v-progress-circular>
                                                  </div>
                                              </template>
                                          </v-img>
                                      </div>
                                  </v-col>
                              </v-row>
                          </v-col>
                                         </v-row>
                 </v-container>
             </v-card-text>
             <v-divider class="mt-3"></v-divider>
 
                                                       <!-- References Section at Bottom -->
               <v-card-text class="pa-4 bg-grey-lighten-5">
                   <div class="references-section">
                       <h4 class="text-subtitle-1 font-weight-bold mb-2">
                           <v-icon class="mr-2 mt-0" size="small">mdi-book-open-variant</v-icon>
                           References
                       </h4>
                       <div class="references-list">
                           <div v-for="(reference, index) in references" :key="index" class="reference-item py-0">
                               <div class="reference-text ">
                                   <span class="reference-number">{{ index + 1 }}.</span>
                                   {{ reference }}
                               </div>
                               <v-btn 
                                   v-if="refLinks && refLinks[index]" 
                                   :href="refLinks[index]" 
                                   target="_blank" 
                                   variant="text" 
                                   color="primary" 
                                   size="small"
                                   class="read-more-btn"
                               >
                                   Read More
                                   <v-icon size="small" class="ml-1">mdi-open-in-new</v-icon>
                               </v-btn>
                           </div>
                       </div>
                   </div>
               </v-card-text>
         </v-card>
     </v-dialog>
</template>

<script setup>
import { computed } from 'vue'

 /**
  * MethodPopup component - Displays detailed method information in a popup dialog
  * 
  * Props:
  * - modelValue: Boolean - Controls dialog visibility
  * - title: String - Popup title
  * - cards: Array - Array of card objects with color, title, description, and optional icon
  * - imagePath: String - Path to the method image
  * - references: Array - Array of reference strings
  * - refLinks: Array - Array of URLs for reference links (optional)
  * - headerColor: String - Header background color (default: primary theme color)
  * - titleTextColor: String - Header title text color (default: white)
  */
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: 'Method Details'
    },
    cards: {
        type: Array,
        default: () => []
    },
    imagePath: {
        type: String,
        default: ''
    },
         references: {
         type: Array,
         default: () => []
     },
     refLinks: {
         type: Array,
         default: () => []
     },
     headerColor: {
         type: String,
         default: 'var(--v-primary-base)'
     },
     titleTextColor: {
         type: String,
         default: 'white'
     }
})

const emit = defineEmits(['update:modelValue'])

// Computed property for dialog visibility
const dialog = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

/**
 * Closes the dialog
 */
const closeDialog = () => {
    dialog.value = false
}
</script>

<style scoped>
.method-popup {
    border-radius: 12px;
    overflow: hidden;
}

.method-card {
    border-radius: 8px;
    transition: all 0.3s ease;
}

.method-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

      .image-container {
       border-radius: 8px;
       overflow: hidden;
       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
       transition: all 0.3s ease;
       cursor: pointer;
       position: relative;
       transform-origin: center center;
   }
   
   .image-container:hover {
       transform: scale(1.3) translateX(-12%) translateY(4%);
       box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
       z-index: 1000;
       position: relative;
   }
   
   .method-image {
       border-radius: 8px;
       transition: all 0.3s ease;
   }
   


   .references-section {
      display: flex;
      flex-direction: column;
  }
  
  .references-list {
      display: flex;
      flex-direction: column;
      gap: 0px;
      max-height: 150px;
      overflow-y: auto;
      padding-right: 4px;
  }
  
  .reference-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 8px 0;
      transition: all 0.2s ease;
  }
  
  .reference-item:hover {
      background-color: #f5f5f5;
      border-radius: 4px;
  }
  
  .reference-text {
      flex: 1;
      font-size: 0.875rem;
      line-height: 1.4;
      color: #333;
      display: flex;
      align-items: flex-start;
  }
  
  .reference-number {
      font-weight: bold;
      color: #2196F3;
      margin-right: 8px;
      flex-shrink: 0;
  }
  
  .read-more-btn {
      flex-shrink: 0;
      margin-left: 12px;
  }

/* Responsive adjustments */
@media (max-width: 960px) {
    .method-popup {
        margin: 16px;
    }

    .method-card {
        margin-bottom: 16px;
    }
}
</style>