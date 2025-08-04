<template>
  <v-container class="fill-height" max-width="1200">
    <div>
      <!-- Hero Section -->
      <div class="mb-8 text-center">
        <v-img
          src="@/assets/CHETNA.svg"
          alt="CHETNA Logo"
          max-width="200"
          max-height="80"
          class="mx-auto mb-6"
        />
        <h1 class="text-h2 font-weight-bold" style="color: #1E324F;">Welcome to CHETNA 100 Indian Cities</h1>
        <p class="text-h5 mt-4" style="color: #2F3E4E;">
          Comprehensive Insights into India's Development Journey
        </p>
        <p class="text-subtitle-1 mt-4" style="color: #555555;">
          Data-driven research and analysis for understanding India's progress across various sectors
        </p>
        <div class="mt-6">
          <v-btn 
            color="highlight" 
            size="large" 
            class="mr-4"
            to="/facts"
          >
            Explore Facts
          </v-btn>
          <v-btn 
            color="download" 
            size="large" 
            variant="outlined"
            to="/methodology"
          >
            Learn More
          </v-btn>
        </div>
      </div>

      <!-- Key Features Section -->
      <v-row class="mb-8">
        <v-col v-for="feature in features" :key="feature.title" cols="12" md="4">
          <v-card class="text-center h-100" elevation="2">
            <v-card-text>
              <v-icon size="64" :color="feature.color" class="mb-4">{{ feature.icon }}</v-icon>
              <h3 class="text-h5 font-weight-bold mb-3" style="color: #1E324F;">{{ feature.title }}</h3>
              <p class="text-body-1" style="color: #2F3E4E;">{{ feature.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Latest Research Section -->
      <v-card class="mb-8" elevation="2">
        <v-card-title class="text-h4 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
          Latest Research & Insights
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="research in latestResearch" :key="research.title" cols="12" md="6">
              <v-card class="mb-4" style="background-color: #ECE1C5;">
                <v-card-title class="text-h6 font-weight-bold" style="color: #2F3E4E;">
                  {{ research.title }}
                </v-card-title>
                <v-card-text>
                  <p class="text-body-2 mb-3" style="color: #2F3E4E;">{{ research.description }}</p>
                  <v-chip-group>
                    <v-chip 
                      v-for="tag in research.tags" 
                      :key="tag"
                      size="small"
                      color="highlight"
                      text-color="white"
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
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Statistics Section -->
      <v-card class="mb-8" elevation="2">
        <v-card-title class="text-h4 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
          Key Statistics
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="stat in statistics" :key="stat.label" cols="12" sm="6" md="3">
              <div class="text-center">
                <div class="text-h3 font-weight-bold mb-2" :style="{ color: stat.color }">
                  {{ stat.value }}
                </div>
                <div class="text-body-1" style="color: #2F3E4E;">{{ stat.label }}</div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Call to Action -->
      <v-card class="text-center" elevation="2" style="background-color: #1E324F;">
        <v-card-text>
          <h2 class="text-h4 font-weight-bold mb-4" style="color: #FFFFFF;">
            Ready to Explore India's Data?
          </h2>
          <p class="text-body-1 mb-6" style="color: #FFFFFF;">
            Discover comprehensive insights, research reports, and data-driven analysis 
            about India's development across various sectors.
          </p>
          <v-btn 
            color="highlight" 
            size="large" 
            class="mr-4"
            to="/news"
          >
            Latest News
          </v-btn>
          <v-btn 
            color="download" 
            size="large" 
            variant="outlined"
                            to="/people"
              >
                Our People
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
/**
 * Home page component
 * Displays welcome content, key features, and latest research
 */

const features = [
  {
    title: 'Data-Driven Insights',
    description: 'Comprehensive analysis using reliable data sources and advanced analytical methods.',
    icon: 'mdi-chart-line',
    color: 'total'
  },
  {
    title: 'Research Excellence',
    description: 'High-quality research conducted by experienced professionals and subject matter experts.',
    icon: 'mdi-school',
    color: 'power'
  },
  {
    title: 'Policy Impact',
    description: 'Translating research findings into actionable policy recommendations for development.',
    icon: 'mdi-target',
    color: 'traffic'
  }
]

const latestResearch = [
  {
    title: 'Economic Growth Analysis 2024',
    description: 'Comprehensive analysis of India\'s economic performance and growth projections.',
    tags: ['Economics', 'Growth', 'Analysis']
  },
  {
    title: 'Digital Transformation Report',
    description: 'Examining the impact of digital technologies on various sectors of the economy.',
    tags: ['Technology', 'Digital', 'Innovation']
  },
  {
    title: 'Healthcare Infrastructure Study',
    description: 'Assessment of healthcare facilities and recommendations for improvement.',
    tags: ['Healthcare', 'Infrastructure', 'Policy']
  },
  {
    title: 'Education Quality Index',
    description: 'Measuring educational outcomes and identifying areas for enhancement.',
    tags: ['Education', 'Quality', 'Development']
  }
]

const statistics = [
  {
    value: '15+',
    label: 'Years of Research',
    color: '#3B6DFF'
  },
  {
    value: '500+',
    label: 'Research Reports',
    color: '#E6BD4F'
  },
  {
    value: '50+',
    label: 'Expert Analysts',
    color: '#88A941'
  },
  {
    value: '25+',
    label: 'Sectors Covered',
    color: '#E57A33'
  }
]
</script>
