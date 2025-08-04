<template>
  <v-container class="fill-height" max-width="1200">
    <div>
      <div class="mb-8 text-center">
        <div class="text-body-2 font-weight-light mb-n1">Indian Website</div>
        <h1 class="text-h2 font-weight-bold" style="color: #1E324F;">Color Theme Palette</h1>
        <p class="text-subtitle-1 mt-4" style="color: #2F3E4E;">
          Complete color scheme for the Indian website design system
        </p>
      </div>

      <!-- Primary Colors Section -->
      <v-card class="mb-6" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
          Primary Colors
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="color in primaryColors" :key="color.name" cols="12" sm="6" md="4">
              <v-card class="color-card" elevation="1">
                <div 
                  class="color-swatch" 
                  :style="{ backgroundColor: color.hex }"
                ></div>
                <v-card-text class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2">{{ color.name }}</h3>
                  <p class="text-body-2 mb-2" style="color: #2F3E4E;">
                    <strong>Hex:</strong> {{ color.hex }}
                  </p>
                  <p class="text-caption" style="color: #555555;">
                    {{ color.usage }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Text Colors Section -->
      <v-card class="mb-6" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
          Text Colors
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="color in textColors" :key="color.name" cols="12" sm="6">
              <v-card class="color-card" elevation="1">
                <div 
                  class="color-swatch" 
                  :style="{ backgroundColor: color.hex }"
                ></div>
                <v-card-text class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2" :style="{ color: color.hex }">
                    {{ color.name }}
                  </h3>
                  <p class="text-body-2 mb-2" style="color: #2F3E4E;">
                    <strong>Hex:</strong> {{ color.hex }}
                  </p>
                  <p class="text-caption" style="color: #555555;">
                    {{ color.usage }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Interactive Colors Section -->
      <v-card class="mb-6" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
          Interactive Colors
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="color in interactiveColors" :key="color.name" cols="12" sm="6" md="4">
              <v-card class="color-card" elevation="1">
                <div 
                  class="color-swatch" 
                  :style="{ backgroundColor: color.hex }"
                ></div>
                <v-card-text class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2">{{ color.name }}</h3>
                  <p class="text-body-2 mb-2" style="color: #2F3E4E;">
                    <strong>Hex:</strong> {{ color.hex }}
                  </p>
                  <p class="text-caption" style="color: #555555;">
                    {{ color.usage }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Chart Colors Section -->
      <v-card class="mb-6" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
          Chart Colors
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="color in chartColors" :key="color.name" cols="12" sm="6" md="4">
              <v-card class="color-card" elevation="1">
                <div 
                  class="color-swatch" 
                  :style="{ backgroundColor: color.hex }"
                ></div>
                <v-card-text class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2">{{ color.name }}</h3>
                  <p class="text-body-2 mb-2" style="color: #2F3E4E;">
                    <strong>Hex:</strong> {{ color.hex }}
                  </p>
                  <p class="text-caption" style="color: #555555;">
                    {{ color.usage }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Data Visualization Colors Section -->
      <v-card class="mb-6" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
          Data Visualization Colors
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="color in dataVizColors" :key="color.name" cols="12" sm="6" md="4">
              <v-card class="color-card" elevation="1">
                <div 
                  class="color-swatch" 
                  :style="{ backgroundColor: color.hex }"
                ></div>
                <v-card-text class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2">{{ color.name }}</h3>
                  <p class="text-body-2 mb-2" style="color: #2F3E4E;">
                    <strong>Hex:</strong> {{ color.hex }}
                  </p>
                  <p class="text-caption" style="color: #555555;">
                    {{ color.usage }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Usage Examples Section -->
      <v-card class="mb-6" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
          Usage Examples
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="mb-4" style="background-color: #1E324F;">
                <v-card-title class="text-h6" style="color: #FFFFFF;">
                  Header Example
                </v-card-title>
                <v-card-text style="color: #FFFFFF;">
                  This demonstrates the primary background with white text
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="mb-4" style="background-color: #F5F6FA;">
                <v-card-title class="text-h6" style="color: #2F3E4E;">
                  Main Content Example
                </v-card-title>
                <v-card-text style="color: #2F3E4E;">
                  This demonstrates the secondary background with dark text
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn 
                class="ma-2" 
                style="background-color: #426B8D; color: #FFFFFF;"
                size="large"
              >
                Action Button
              </v-btn>
              <v-btn 
                class="ma-2" 
                style="background-color: #2D3D59; color: #FFFFFF;"
                size="large"
              >
                Download Button
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="mb-4" style="background-color: #ECE1C5;">
                <v-card-title class="text-h6" style="color: #2F3E4E;">
                  Accent Section
                </v-card-title>
                <v-card-text style="color: #2F3E4E;">
                  This demonstrates the accent background for section dividers
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Data Visualization Examples Section -->
      <v-card class="mb-6" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="color: #1E324F; background-color: #F5F6FA;">
          Data Visualization Examples
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-4" style="color: #2F3E4E;">Chart Legend Example</h4>
              <div class="d-flex flex-wrap gap-2">
                <div v-for="color in dataVizColors.slice(0, 4)" :key="color.name" class="d-flex align-center">
                  <div 
                    class="legend-color mr-2" 
                    :style="{ backgroundColor: color.hex }"
                  ></div>
                  <span class="text-body-2" style="color: #2F3E4E;">{{ color.name }}</span>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-4" style="color: #2F3E4E;">Bar Chart Example</h4>
              <div class="d-flex align-end" style="height: 120px;">
                <div 
                  v-for="(color, index) in dataVizColors.slice(0, 4)" 
                  :key="color.name"
                  class="bar-chart-bar mx-1"
                  :style="{ 
                    backgroundColor: color.hex,
                    height: `${60 + (index * 15)}px`
                  }"
                ></div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
/**
 * ColorPalette component displays the complete color theme for the Indian website
 * Shows all colors with their hex codes and usage descriptions
 */

const primaryColors = [
  {
    name: 'Primary Background',
    hex: '#1E324F',
    usage: 'Header, navigation bar'
  },
  {
    name: 'Secondary Background',
    hex: '#F5F6FA',
    usage: 'Main background'
  },
  {
    name: 'Accent Background',
    hex: '#ECE1C5',
    usage: 'Section dividers, toggles'
  }
]

const textColors = [
  {
    name: 'Primary Text',
    hex: '#FFFFFF',
    usage: 'Header text on dark background'
  },
  {
    name: 'Secondary Text',
    hex: '#2F3E4E',
    usage: 'Main content text'
  }
]

const interactiveColors = [
  {
    name: 'Highlight / Button Color',
    hex: '#426B8D',
    usage: 'Toggle button, action CTA'
  },
  {
    name: 'Interactive Hover / Tooltip',
    hex: '#D6E4F0',
    usage: 'Hover states, tooltips'
  },
  {
    name: 'Download Buttons',
    hex: '#2D3D59',
    usage: 'Consistent with header'
  }
]

const chartColors = [
  {
    name: 'Line Chart: 2025',
    hex: '#3878C3',
    usage: 'Line color for current year'
  },
  {
    name: 'Line Chart: 2024',
    hex: '#555555',
    usage: 'Line color for previous year'
  },
  {
    name: 'Line Chart: 2023',
    hex: '#A0AABA',
    usage: 'Line color for oldest year'
  }
]

const dataVizColors = [
  {
    name: 'Total',
    hex: '#3B6DFF',
    usage: 'Bright cobalt blue for total metrics'
  },
  {
    name: 'Power',
    hex: '#E6BD4F',
    usage: 'Warm mustard yellow for power data'
  },
  {
    name: 'Traffic',
    hex: '#88A941',
    usage: 'Olive green for traffic metrics'
  },
  {
    name: 'Residential Scope 1',
    hex: '#D5A6D0',
    usage: 'Soft orchid pink for residential scope 1'
  },
  {
    name: 'Residential Scope 2',
    hex: '#A65CA1',
    usage: 'Deep purple plum for residential scope 2'
  },
  {
    name: 'Industrial',
    hex: '#E57A33',
    usage: 'Burnt orange for industrial data'
  },
  {
    name: 'Aviation',
    hex: '#457B63',
    usage: 'Forest green for aviation metrics'
  },
  {
    name: 'Power PM2.5',
    hex: '#3D3C38',
    usage: 'Charcoal gray for power PM2.5 data'
  }
]
</script>

<style scoped>
.color-card {
  transition: transform 0.2s ease-in-out;
  height: 100%;
}

.color-card:hover {
  transform: translateY(-2px);
}

.color-swatch {
  height: 80px;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #e0e0e0;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}

.bar-chart-bar {
  width: 30px;
  border-radius: 4px 4px 0 0;
  min-height: 20px;
}
</style> 