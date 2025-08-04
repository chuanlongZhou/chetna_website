# CHETNA Website

A Vue.js-based website showcasing India's energy consumption data and facts using Vuetify and ECharts.

## Features

- **Responsive Design**: Built with Vuetify for mobile-first responsive layouts
- **Interactive Visualizations**: Time series plots using ECharts
- **Energy Data Visualization**: Charts showing India's energy consumption trends
- **Modern UI**: Clean, professional design with consistent color scheme
- **Timeline Component**: Interactive timeline for displaying project milestones and research phases
- **Scroll Animations**: GSAP-powered scroll-triggered animations for methodology visualization

## Components

### MethodAnimation Component

A Vue component that creates an interactive scroll-triggered animation showing the CHETNA methodology process using GSAP.

**Location**: `src/components/UI/method_animation.vue`

**Features**:
- Scroll-triggered animations using GSAP ScrollTrigger
- Interactive timeline showing CHETNA Goal and Strategy phases
- Animated elements that appear and transform based on scroll position
- Smooth transitions between different methodology stages
- Visual representation of data modeling, scenario analysis, and policy development

**Dependencies**:
- GSAP (GreenSock Animation Platform)
- ScrollTrigger plugin

**Usage Example**:
```vue
<MethodAnimation />
```

### MethodPopup Component

A Vue component that displays detailed methodology information in a popup dialog with a three-panel layout.

**Location**: `src/components/UI/MethodPopup.vue`

**Props**:
- `modelValue` (boolean): Controls dialog visibility
- `title` (string): Popup title (default: 'Method Details')
- `cards` (array): Array of card objects with color, title, description, and optional icon
- `imagePath` (string): Path to the method image
- `references` (array): Array of reference strings
- `refLinks` (array): Array of URLs for reference links (optional)
- `headerColor` (string): Header background color (default: primary theme color)
- `titleTextColor` (string): Header title text color (default: white)

**Card Object Structure**:
```javascript
{
  color: '#4CAF50',
  title: 'Data Source',
  description: 'Power Generation, Grid Transmission Data, Plant Meta Data, Grid Infrastructure',
  icon: 'mdi-database'
}
```

**Usage Example**:
```vue
<MethodPopup
  v-model="showMethodPopup"
  :title="methodData.title"
  :cards="methodData.cards"
  :image-path="methodData.imagePath"
  :references="methodData.references"
  :ref-links="methodData.refLinks"
/>
```

**Features**:
- Three-panel layout: left cards, right top image, bottom references
- Responsive design that adapts to different screen sizes
- Hover effects and smooth animations
- Material Design icons and consistent styling
- Dialog with close button and backdrop
- Loading placeholder for images
- Customizable header color via props
- Proper spacing between left column cards
- Configurable icons for each methodology step
- Simplified references section with "Read More" links
- External link support for references with target="_blank"

### TimelineComponent

A reusable Vue component for displaying timeline data in a visually appealing format using Vuetify timeline.

**Location**: `src/components/UI/TimelineComponent.vue`

**Props**:
- `timelineData` (array, required): Array of timeline items with title, description, date, color, icon, details
- `title` (string): Title for the timeline section (default: 'Timeline')

**Timeline Item Structure**:
```javascript
{
  title: "Project Phase",
  description: "Brief description of the phase",
  date: "January 2023",
  color: "total", // Vuetify color theme
  icon: "mdi-flag", // Material Design icon
  details: "Detailed information about this phase"
}
```

**Usage Example**:
```vue
<TimelineComponent 
  :timeline-data="timelineData"
  title="Research Project Timeline"
/>
```

**Features**:
- Responsive timeline layout with Vuetify components
- Expandable details for each timeline item
- Customizable colors and icons
- Smooth animations and hover effects
- Automatic fallback colors and icons if not specified
- Interactive "Show More/Less" functionality

### TimeSeriesPlot Component

A reusable Vue component for creating time series scatter-line plots using ECharts.

**Location**: `src/components/viz/TimeSeriesPlot.vue`

**Props**:
- `dataUrl` (string): URL to fetch CSV data from internet
- `csvData` (string): CSV data as string (alternative to dataUrl)
- `dateColumn` (string, required): Name of the date column in CSV
- `dataColumns` (object, required): Object with column names as keys and colors as values
- `xTicks` (string): X-axis tick format ('yearly', 'monthly', etc.)
- `yLabel` (string): Y-axis label
- `scatterInterval` (number): Interval to enlarge scatter points (default: 1)
- `title` (string): Chart title

**Usage Example**:
```vue
<TimeSeriesPlot
  :csv-data="energyData"
  date-column="Year"
  :data-columns="energyColumns"
  x-ticks="yearly"
  y-label="Energy Consumption (EJ per capita)"
  :scatter-interval="5"
  title="Annual Energy Consumption in India (per capita)"
/>
```

**Features**:
- Supports both URL and local CSV data
- Configurable colors for each data series
- Responsive design with automatic resizing
- Interactive tooltips
- Customizable scatter point intervals
- Smooth line transitions

### LineStackChart Component

A Vue component that replicates the Apache ECharts line-stack example with area styling and smooth curves.

**Location**: `src/components/viz/LineStackChart.vue`

**Props**:
- `title` (string): Chart title (default: 'Line Stack Chart')
- `customData` (array): Custom data array with categories and series data (optional)

**Usage Example**:
```vue
<LineStackChart 
  title="Weekly Traffic Sources"
  :custom-data="lineStackData"
/>
```

**Features**:
- Replicates the Apache ECharts line-stack example
- Smooth area styling with gradient colors
- Interactive tooltips and legend
- Responsive design with automatic resizing
- Built-in sample data for demonstration
- Customizable data structure

## Pages

### Methodology Page

**Location**: `src/pages/methodology.vue`

The methodology page showcases the research approach with two main sections:

1. **Method Animation Section**: Interactive scroll-triggered animation showing the CHETNA methodology process
2. **Timeline Section**: Research project timeline using the TimelineComponent

**Features**:
- Scroll-triggered animations using GSAP
- Interactive methodology visualization
- Research project phases and milestones
- Clean, focused layout highlighting the research process
- Responsive design that works on all devices

**Data Source**: Timeline data is loaded from `src/assets/time_line.json` with fallback data if loading fails.

## Data Sources

The project includes energy consumption data for India:
- **File**: `src/assets/india_fact_data/22_EnergyLines_wBio_IND_EJ_percapita_data.csv`
- **Content**: Annual energy consumption data from 1965-2023
- **Sources**: Coal, Oil, Bioenergy, Gas, Hydro, Solar, Wind, Nuclear, Other, Biofuels

**Timeline Data**: `src/assets/time_line.json` contains research project milestones and phases.

## Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
cd chetna_website
npm install
npm install gsap  # For scroll animations
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Project Structure

```
chetna_website/
├── src/
│   ├── components/
│   │   ├── UI/
│   │   │   ├── TimelineComponent.vue     # Timeline display component
│   │   │   └── method_animation.vue      # Scroll-triggered animation component
│   │   └── viz/
│   │       ├── TimeSeriesPlot.vue        # Time series chart component
│   │       └── LineStackChart.vue        # Line stack chart component
│   ├── assets/
│   │   ├── india_fact_data/              # Energy consumption CSV files
│   │   └── time_line.json                # Timeline data for methodology page
│   ├── pages/
│   │   ├── facts.vue                     # Facts page with energy charts
│   │   ├── methodology.vue               # Methodology page with animation and timeline
│   │   └── test.vue                      # Test page with chart examples
│   └── utils/
│       └── csvLoader.js                  # CSV loading utilities
├── package.json
└── README.md
```

## Technologies Used

- **Vue.js 3**: Progressive JavaScript framework
- **Vuetify 3**: Material Design component framework
- **ECharts**: Interactive charting library
- **GSAP**: Professional animation library for scroll-triggered animations
- **Vue Router**: Client-side routing
- **Pinia**: State management
- **Vite**: Build tool and development server

## Color Scheme

The project uses a consistent color palette:
- Primary: `#1E324F` (Dark Blue)
- Secondary: `#2F3E4E` (Medium Blue)
- Accent: `#F5F6FA` (Light Gray)
- Energy Colors: Custom colors for different energy sources

## Recent Updates

### MethodPopup Component Addition
- Created new `MethodPopup.vue` component for displaying detailed methodology information
- Added method popup data to the app store with comprehensive sector information
- Integrated popup functionality into `method_animation2.vue` with click handlers
- Added support for Power, Traffic, Residential, Industry, Aviation, and Brick manufacturing sectors
- Implemented responsive design with left panel cards, right top image, and right bottom references
- Added hover effects and smooth animations for better user experience

### MethodAnimation Component Addition
- Created new `method_animation.vue` component with GSAP scroll animations
- Added interactive methodology visualization with scroll-triggered animations
- Integrated the animation component into the methodology page
- Fixed syntax error in the animation component
- Added GSAP dependency for advanced animations

### Timeline Component Addition
- Created new `TimelineComponent.vue` for displaying project timelines
- Updated methodology page to use the new timeline component
- Added timeline data in `time_line.json` with research project milestones
- Implemented responsive design with expandable details
- Added fallback data handling for better user experience

## License

This project is part of the CHETNA initiative for energy data visualization and analysis.
