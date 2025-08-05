/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          // Primary colors
          'primary': '#1E324F', // Deep Navy Blue - Header, nav bar
          'primary-2': '#2D4668', // Deep Navy Blue - Header, nav bar
          'primary-3': '#1D466B', // Steel Blue - Toggle button, action CTA
          'primary-4': '#5885B6', // Dark Navy - Consistent with header
          'secondary': '#F5F6FA', // Soft Off-White - Main background
          'accent': '#ECE1C5', // Sand Beige - Section dividers, toggles
          
          // Text colors
          'primary-text': '#FFFFFF', // White - Header text on dark bg
          'secondary-text': '#2F3E4E', // Dark Slate Gray - Main content text
          
          // Interactive colors
          'highlight': '#426B8D', // Steel Blue - Toggle button, action CTA
          'hover': '#D6E4F0', // Pale Ice Blue - Hover states, tooltips
          'download': '#2D3D59', // Dark Navy - Consistent with header
          
          // Chart colors
          'chart-2025': '#3878C3', // Blue - Line color for current year
          'chart-2024': '#555555', // Charcoal Gray - Line color for previous year
          'chart-2023': '#A0AABA', // Light Slate Gray - Line color for oldest year
          
          // Data visualization colors
          'total': '#3B6DFF', // Bright cobalt blue
          'power': '#FBC02D', // Warm mustard yellow
          'traffic': '#43A047', // Olive green
          'residential_scope1': '#9575CD', // Soft orchid pink
          'residential_scope2': '#D1C4E9', // Deep purple plum
          'industrial': '#90A4AE', // Burnt orange
          'aviation': '#00796B', // Forest green
          'power_pm25': '#3D3C38', // Charcoal gray

          
          // Additional color palette
          'mediumBlue': '#1d466b',
          'darkBlue': '#1a3d5e',
          'lightBlue': '#275f91',
          'extralightBlue': '#2f71ad',
          'lightList': '#c4dbeb',
          'night50': '#3b85bb',
          'night75': '#3173a2',
          'night100': '#24597e',
          'night125': '#214f71',
          'night150': '#16364f',
          'increase': '#eb524a',
          'decrease': '#0393cd',
        },
      },
    },
  },
})
