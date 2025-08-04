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
          <!-- Featured News -->
          <v-card class="mb-6" elevation="2">
            <v-img
              src="https://picsum.photos/800/400?random=1"
              height="300"
              cover
            ></v-img>
            <v-card-title class="text-h4 font-weight-bold" style="color: #1E324F;">
              New Research Report: India's Economic Growth Trends 2024
            </v-card-title>
            <v-card-subtitle style="color: #555555;">
              Published on {{ new Date().toLocaleDateString() }} | By CHETNA Research Team
            </v-card-subtitle>
            <v-card-text>
              <p class="text-body-1 mb-4" style="color: #2F3E4E;">
                Our latest comprehensive analysis reveals significant trends in India's economic 
                development, highlighting key sectors driving growth and areas requiring attention. 
                The report covers data from the past decade and provides projections for the coming years.
              </p>
              <v-chip-group>
                <v-chip color="total" text-color="white">Economics</v-chip>
                <v-chip color="power" text-color="white">Research</v-chip>
                <v-chip color="traffic" text-color="white">Development</v-chip>
              </v-chip-group>
            </v-card-text>
            <v-card-actions>
              <v-btn color="highlight" variant="outlined">
                Read Full Report
              </v-btn>
              <v-btn color="download" variant="text">
                Download PDF
              </v-btn>
            </v-card-actions>
          </v-card>

          <!-- News List -->
          <div v-for="article in newsArticles" :key="article.id">
            <v-card class="mb-4" elevation="1">
              <v-row no-gutters>
                <v-col cols="12" md="4">
                  <v-img
                    :src="article.image"
                    height="200"
                    cover
                  ></v-img>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-title class="text-h6 font-weight-bold" style="color: #1E324F;">
                    {{ article.title }}
                  </v-card-title>
                  <v-card-subtitle style="color: #555555;">
                    {{ article.date }} | {{ article.author }}
                  </v-card-subtitle>
                  <v-card-text>
                    <p class="text-body-2" style="color: #2F3E4E;">
                      {{ article.excerpt }}
                    </p>
                    <v-chip-group>
                      <v-chip 
                        v-for="tag in article.tags" 
                        :key="tag"
                        size="small"
                        color="accent"
                        text-color="secondary-text"
                      >
                        {{ tag }}
                      </v-chip>
                    </v-chip-group>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="highlight" variant="text" size="small">
                      Read More
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <!-- Categories -->
          <v-card class="mb-6" elevation="2">
            <v-card-title class="text-h6 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
              Categories
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="category in categories"
                  :key="category.name"
                  link
                >
                  <v-list-item-icon>
                    <v-icon :color="category.color">{{ category.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ category.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ category.count }} articles</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>

          <!-- Timeline Section -->
          <v-card class="mb-6" elevation="2">
            <TimelineComponent 
              :timeline-data="timelineData"
              title="Research Project Timeline"
            />
          </v-card>

          <!-- Newsletter Signup -->
          <v-card elevation="2">
            <v-card-title class="text-h6 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
              Subscribe to Updates
            </v-card-title>
            <v-card-text>
              <p class="text-body-2 mb-4" style="color: #2F3E4E;">
                Get the latest news and research updates delivered to your inbox.
              </p>
              <v-text-field
                label="Email Address"
                variant="outlined"
                density="compact"
                class="mb-3"
              ></v-text-field>
              <v-btn color="highlight" block>
                Subscribe
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TimelineComponent from '../components/UI/TimelineComponent.vue'

/**
 * News page component
 * Displays news articles, updates, research findings, and project timeline
 */

const timelineData = ref([])

/**
 * Load timeline data from JSON file
 */
const loadTimelineData = async () => {
  try {
    const response = await fetch('/src/assets/time_line.json')
    const data = await response.json()
    timelineData.value = data
  } catch (error) {
    console.error('Error loading timeline data:', error)
  }
}

onMounted(() => {
  loadTimelineData()
})

const newsArticles = [
  {
    id: 1,
    title: 'India\'s Digital Transformation: A Comprehensive Analysis',
    excerpt: 'Exploring the rapid digital adoption across various sectors and its impact on economic growth and social development.',
    date: '2024-01-15',
    author: 'Dr. Priya Sharma',
    image: 'https://picsum.photos/400/200?random=2',
    tags: ['Technology', 'Digital', 'Innovation']
  },
  {
    id: 2,
    title: 'Sustainable Development Goals: India\'s Progress Report',
    excerpt: 'An in-depth analysis of India\'s progress towards achieving the United Nations Sustainable Development Goals.',
    date: '2024-01-10',
    author: 'Rajesh Kumar',
    image: 'https://picsum.photos/400/200?random=3',
    tags: ['SDG', 'Sustainability', 'Development']
  },
  {
    id: 3,
    title: 'Healthcare Infrastructure: Challenges and Opportunities',
    excerpt: 'Examining the current state of healthcare infrastructure and identifying key areas for improvement and investment.',
    date: '2024-01-05',
    author: 'Anita Patel',
    image: 'https://picsum.photos/400/200?random=4',
    tags: ['Healthcare', 'Infrastructure', 'Policy']
  }
]

const categories = [
  {
    name: 'Economics',
    count: 12,
    icon: 'mdi-currency-inr',
    color: 'total'
  },
  {
    name: 'Technology',
    count: 8,
    icon: 'mdi-laptop',
    color: 'power'
  },
  {
    name: 'Healthcare',
    count: 6,
    icon: 'mdi-hospital-building',
    color: 'traffic'
  },
  {
    name: 'Education',
    count: 5,
    icon: 'mdi-school',
    color: 'industrial'
  },
  {
    name: 'Environment',
    count: 4,
    icon: 'mdi-leaf',
    color: 'aviation'
  }
]
</script> 