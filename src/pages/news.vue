<template>
  <v-container class="fill-height" max-width="1200">
    <div>
      <div class="mb-8 text-center">
        <h1 class="text-h2 font-weight-bold" style="color: #1E324F;">News & Updates</h1>
        <p class="text-subtitle-1 mt-4" style="color: #2F3E4E;">
          Stay updated with the latest news, research findings, and developments
        </p>
      </div>

      <v-row>
                 <v-col cols="12" md="8">
                      <!-- Featured News (only on page 1) -->
            <v-card v-if="newsArticles.length > 0 && currentPage === 1" class="mb-6" elevation="2">
              <v-img
                v-if="newsArticles[0].image_path"
                :src="newsArticles[0].image_path"
                height="300"
                cover
              ></v-img>
              <v-card-title class="text-h4 font-weight-bold" style="color: #1E324F; word-wrap: break-word; white-space: normal; line-height: 1.2;">
                {{ newsArticles[0].title }}
              </v-card-title>
              <v-card-subtitle style="color: #555555;">
                {{ newsArticles[0].subtitle }}
              </v-card-subtitle>
              <v-card-text>
                <p class="text-body-1 mb-4" style="color: #2F3E4E;">
                  {{ newsArticles[0].description_short }}
                </p>
                <p v-if="newsArticles[0].description_full" class="text-body-1 mb-4" style="color: #2F3E4E;">
                  {{ newsArticles[0].description_full }}
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn 
                  v-if="newsArticles[0].outside_link"
                  :href="newsArticles[0].outside_link"
                  target="_blank"
                  color="highlight" 
                  variant="outlined">
                  Read Full Article
                </v-btn>
              </v-card-actions>
            </v-card>

                                          <!-- News List -->
            <div v-for="(article, index) in paginatedNews" :key="index">
                         <v-card 
               class="mb-4 news-card" 
               elevation="1"
               @mouseenter="hoveredIndex = (currentPage - 1) * itemsPerPage + index"
               @mouseleave="hoveredIndex = null"
               :class="{ 'expanded-news': hoveredIndex === (currentPage - 1) * itemsPerPage + index }"
             >
                                                <!-- Expanded Layout (like latest news) -->
                 <template v-if="hoveredIndex === (currentPage - 1) * itemsPerPage + index">
                   <v-img
                     v-if="article.image_path"
                     :src="article.image_path"
                     height="300"
                     cover
                     class="transition-all"
                   ></v-img>
                   <v-card-title class="text-h4 font-weight-bold transition-all" style="color: #1E324F; word-wrap: break-word; white-space: normal; line-height: 1.2;">
                     {{ article.title }}
                   </v-card-title>
                 <v-card-subtitle style="color: #555555;">
                   {{ article.subtitle }}
                 </v-card-subtitle>
                 <v-card-text>
                   <p class="text-body-1 mb-4" style="color: #2F3E4E;">
                     {{ article.description_short }}
                   </p>
                   <p v-if="article.description_full" class="text-body-1 mb-4" style="color: #2F3E4E;">
                     {{ article.description_full }}
                   </p>
                 </v-card-text>
                 <v-card-actions>
                   <v-btn 
                     v-if="article.outside_link" 
                     :href="article.outside_link" 
                     target="_blank"
                     color="highlight" 
                     variant="outlined"
                     class="transition-all"
                   >
                     Read Full Article
                   </v-btn>
                 </v-card-actions>
               </template>
               
               <!-- Compact Layout (default) -->
               <template v-else>
                 <v-row no-gutters>
                   <v-col cols="12" md="4" v-if="article.image_path">
                     <v-img
                       :src="article.image_path"
                       height="200"
                       cover
                       class="transition-all"
                     ></v-img>
                   </v-col>
                   <v-col cols="12" :md="article.image_path ? 8 : 12">
                     <v-card-title class="text-h6 font-weight-bold transition-all" style="color: #1E324F;">
                       {{ article.title }}
                     </v-card-title>
                     <v-card-subtitle style="color: #555555;">
                       {{ article.subtitle }}
                     </v-card-subtitle>
                     <v-card-text>
                       <p class="text-body-2" style="color: #2F3E4E;">
                         {{ article.description_short }}
                       </p>
                     </v-card-text>
                     <v-card-actions>
                       <v-btn 
                         v-if="article.outside_link" 
                         :href="article.outside_link" 
                         target="_blank"
                         color="highlight" 
                         variant="text" 
                         size="small"
                         class="transition-all"
                       >
                         Read Full Article
                       </v-btn>
                     </v-card-actions>
                   </v-col>
                 </v-row>
                              </template>
             </v-card>
           </div>
           
           <!-- Pagination -->
           <div class="d-flex justify-center mt-6" v-if="totalPages > 1">
             <v-pagination
               v-model="currentPage"
               :length="totalPages"
               :total-visible="7"
               color="highlight"
               class="mb-4"
             ></v-pagination>
           </div>
         </v-col>

                 <v-col cols="12" md="4">
           <!-- Gallery -->
           <GalleryComponent />

          <!-- Timeline Section -->
          <v-card class="mb-6" elevation="2">
            <v-card-title class="text-body-1 font-weight-bold py-1" style="color: white; background-color: #24597e;">
              Research Project Timeline
            </v-card-title>
            <TimelineComponent 
              :timeline-data="timelineData"
              title=""
            />
          </v-card>

          <!-- Newsletter Signup -->
          <v-card elevation="2">
            <v-card-title class="text-body-1 font-weight-bold py-1" style="color: white; background-color: #24597e;">
              Subscribe to Updates
            </v-card-title>
            <v-card-text>
              <p class="text-body-2 mb-4" style="color: #2F3E4E;">
                Get the latest news and research updates delivered to your inbox.
              </p>
              <v-form ref="subscribeForm" v-model="isFormValid">
                <v-text-field
                  v-model="emailAddress"
                  label="Email Address"
                  variant="outlined"
                  density="compact"
                  class="mb-3"
                  :rules="emailRules"
                  type="email"
                  required
                ></v-text-field>
                <v-btn 
                  color="highlight" 
                  block 
                  :disabled="!isFormValid || isSubmitting"
                  :loading="isSubmitting"
                  @click="handleSubscribe"
                >
                  {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
                </v-btn>
              </v-form>
              <v-alert
                v-if="subscribeMessage"
                :type="subscribeMessageType"
                class="mt-3"
                variant="tonal"
                density="compact"
              >
                {{ subscribeMessage }}
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import TimelineComponent from '../components/UI/TimelineComponent.vue'
import GalleryComponent from '../components/UI/GalleryComponent.vue'

/**
 * News page component
 * Displays news articles, updates, research findings, and project timeline
 */

const appStore = useAppStore()

// Use data from the store
const timelineData = computed(() => appStore.projectTimeline)
const newsArticles = computed(() => appStore.newsArticles)

// Hover state for news cards
const hoveredIndex = ref(null)

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 5

// Pagination computed properties
const totalPages = computed(() => {
  const totalNews = newsArticles.value.length - 1 // Exclude featured news
  return Math.ceil(totalNews / itemsPerPage)
})

const paginatedNews = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return newsArticles.value.slice(1).slice(startIndex, endIndex)
})

// Newsletter subscription functionality
const emailAddress = ref('')
const isFormValid = ref(false)
const isSubmitting = ref(false)
const subscribeMessage = ref('')
const subscribeMessageType = ref('success')
const subscribeForm = ref(null)

// Email validation rules using Vuetify's built-in validation
const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid',
]

/**
 * Handle newsletter subscription
 * Sends the email to chuanlong.zhou@lsce.ipsl.fr
 */
const handleSubscribe = async () => {
  if (!isFormValid.value) {
    return
  }

  isSubmitting.value = true
  subscribeMessage.value = ''

  try {
    // Create mailto link to send email
    const subject = 'New Newsletter Subscription'
    const body = `A new user has subscribed to the newsletter updates.\n\nEmail: ${emailAddress.value}\n\nThis is an automated message from the CHETNA website.`
    const mailtoLink = `mailto:chuanlong.zhou@lsce.ipsl.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Open default email client
    window.open(mailtoLink, '_blank')
    
    // Show success message
    subscribeMessage.value = 'Thank you for subscribing! We will contact you soon.'
    subscribeMessageType.value = 'success'
    
    // Reset form
    emailAddress.value = ''
    subscribeForm.value?.reset()
    
  } catch (error) {
    console.error('Subscription error:', error)
    subscribeMessage.value = 'An error occurred. Please try again.'
    subscribeMessageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.transition-all {
  transition: all 0.3s ease-in-out;
}

.news-card {
  transition: all 0.3s ease-in-out;
}

.expanded-news {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}
</style> 