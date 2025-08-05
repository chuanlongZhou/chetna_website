/**
 * Method Popups Data
 * Contains methodology popup information for different sectors
 */

export const methodPopups = {
  'power': {
    title: 'Power Generation Methodology',
    headerColor: '#FBC02D',
    titleTextColor: '#1E324F',
    cards: [
      {
        color: '#4CAF50',
        title: 'Data Source',
        description: 'Power Generation, Grid Transmission Data, Plant Meta Data, Grid Infrastructure',
        icon: 'mdi-database'
      },
      {
        color: '#FF9800',
        title: 'Distribution Model',
        description: 'Multi-level Gravity-Based Model',
        icon: 'mdi-vector-arrange-below'
      },
      {
        color: '#143F6A',
        title: 'Dataset',
        description: 'Plant-level Power generation and Grid-level Power Consumption',
        icon: 'mdi-table'
      },
      {
        color: '#5C64B7',
        title: 'Power Demand Modeling',
        description: 'Economic-Climate Based Machine Learning model',
        icon: 'mdi-chart-line-variant'
      },
      {
        color: '#00BCD4',
        title: 'Application',
        description: 'Future Power Generation and Consumption Scenario',
        icon: 'mdi-home-lightning-bolt-outline'
      }
    ],
    imagePath: new URL('../assets/method/method_power.png', import.meta.url).href,
    references: [
      'Sharma A. and Zhou, C., et al. (2025). CHETNA-Power Sector, EGU25-15602',
    ],
    refLinks: [
      'https://meetingorganizer.copernicus.org/EGU25/EGU25-15602.html',
    ]
  },
  'traffic': {
    title: 'Traffic Emissions Methodology',
    headerColor: '#43A047',
    titleTextColor: 'white',
    cards: [
      {
        color: '#4CAF50',
        title: 'Data Source',
        description: 'Traffic Flow Data, Vehicle Registration, Road Network, GPS Tracking',
        icon: 'mdi-car'
      },
      {
        color: '#5C64B7',
        title: 'Gap Filling ',
        description: 'Machine Learning Model',
        icon: 'mdi-road'
      },
      {
        color: '#9C27B0',
        title: 'Emission Modeling',
        description: 'Vehicle-speed based emission calculation model',
        icon: 'mdi-engine'
      },
      {
        color: '#2196F3',
        title: 'Dataset',
        description: 'Street-level CO2 and Pollutant Emission Map',
        icon: 'mdi-map-marker'
      },
      {
        color: '#00BCD4',
        title: 'Application',
        description: 'Real-time traffic emission monitoring, prediction, and scenario analysis',
        icon: 'mdi-chart-timeline-variant'
      }
    ],
    imagePath: new URL('../assets/method/method_traffic.png', import.meta.url).href,
    references: [
      'Mittakola R. and Ciais, P., et al. (2025). CHETNA-Traffic, EGU25-12873',
      'Mittakola R. and Ciais, P., et al. (2025). High-Resolution Analysis of CO2 and Pollutant Emissions from Road Traffic in Indian Cities, AGU24',
    ],
    refLinks: [
      'https://meetingorganizer.copernicus.org/EGU25/EGU25-12873.html',
      'https://ui.adsabs.harvard.edu/abs/2024AGUFMGC41I0052M/abstract'
    ]
  },
  'residential': {
    title: 'Residential Emissions Methodology',
    headerColor: '#9575CD',
    titleTextColor: 'white',
    cards: [
      {
        color: '#4CAF50',
        title: 'Data Source',
        description: 'Data fusion for building footprint, type, height, regional features dataset, and energy consumption survey',
        icon: 'mdi-home'
      },
      {
        color: '#5C64B7',
        title: 'Gap Filling',
        description: 'Data Augmentation and Semi-Supervised Learning',
        icon: 'mdi-office-building'
      },
      {
        color: '#9C27B0',
        title: 'Consumption Modeling',
        description: 'Socioeconomic-climate based residential energy consumption model using Household Survey ',
        icon: 'mdi-account-group'
      },
      {
        color: '#2196F3',
        title: 'Dataset',
        description: 'Building-level energy consumption and scope1&2 Emission',
        icon: 'mdi-home-city'
      },
      {
        color: '#00BCD4',
        title: 'Application',
        description: 'Residential energy consumption and emission scenarios',
        icon: 'mdi-lightbulb'
      }
    ],
    imagePath: new URL('../assets/method/method_residential.png', import.meta.url).href,
    references: [
      'Sarkar K. and Sarkar A., et al. (2025). CHETNA-Residential Sector, EGU25-15001',
      'Zhou C., et al. (2023). Building Integral Gridded Carbon Emission Disaggregating Model (BIGCarbonEDM), EGU25-4138',
    ],
    refLinks: [
      'https://meetingorganizer.copernicus.org/EGU25/EGU25-15001.html?pdf',
      'https://ui.adsabs.harvard.edu/abs/2023EGUGA..25.4138Z/abstract'
    ]
  },
  'industry': {
    title: 'Industrial Emissions Methodology',
    headerColor: '#3D3C38',
    titleTextColor: 'white',
    cards: [
      {
        color: '#4CAF50',
        title: 'Data Source',
        description: 'Steel and Cement Production Data, Energy Consumption, Facility Locations',
        icon: 'mdi-factory'
      },
      {
        color: '#5C64B7',
        title: 'Near-Real Time Activity Detection',
        description: 'Heat Detection and Vapor and Pollutant Plume Detection with Satellite Image',
        icon: 'mdi-cog'
      },
      {
        color: '#9C27B0',
        title: 'Emission Factor',
        description: 'Energy and Product Based Emission Factor',
        icon: 'mdi-fire'
      },
      {
        color: '#2196F3',
        title: 'Dataset',
        description: 'Industrial facility-level production and energy data',
        icon: 'mdi-chart-box'
      },
      {
        color: '#00BCD4',
        title: 'Application',
        description: 'Industrial emission monitoring and sectoral analysis',
        icon: 'mdi-chart-areaspline'
      }
    ],
    imagePath: new URL('../assets/method/method_industry.png', import.meta.url).href,
    references: [
    ],
    refLinks: [
    ]
  },
  'aviation': {
    title: 'Aviation Emissions Methodology',
    headerColor: '#00796B',
    titleTextColor: 'white',
    cards: [
      {
        color: '#4CAF50',
        title: 'Data Source',
        description: 'Individual flights movements track using FlightRadar24 data',
        icon: 'mdi-airplane'
      },
      {
        color: '#9C27B0',
        title: 'Emission Modeling',
        description: 'CO2 emissions tracking with Aircraft-type specific emission factors ',
        icon: 'mdi-routes'
      },
      {
        color: '#2196F3',
        title: 'Dataset',
        description: 'Flight schedules, aircraft specifications, and fuel consumption data',
        icon: 'mdi-chart-arc'
      },
      {
        color: '#00BCD4',
        title: 'Application',
        description: 'Aviation emission tracking and airport-level analysis',
        icon: 'mdi-airport'
      }
    ],
    imagePath: new URL('../assets/method/method_aviation.png', import.meta.url).href,
    references: [
    ],
    refLinks: [
    ]
  },
  'brick': {
    title: 'Brick Manufacturing Methodology',
    headerColor: '#90A4AE',
    titleTextColor: 'white',
    cards: [
      {
        color: '#4CAF50',
        title: 'Data Source',
        description: 'Brick Kiln Locations from multiple sources',
        icon: 'mdi-toy-brick'
      },
      {
        color: '#FF9800',
        title: 'Kiln Labeling',
        description: 'Ground Truth Labeling for Kiln location and type',
        icon: 'mdi-drawing-box'
      },
      {
        color: '#9C27B0',
        title: 'Kiln Detection',
        description: 'Kiln Detection with Satellite Image',
        icon: 'mdi-memory'
      },
      {
        color: '#2196F3',
        title: 'Dataset',
        description: 'Brick kiln inventory and operational data for kiln type and location',
        icon: 'mdi-database'
      },
      {
        color: '#00BCD4',
        title: 'Application',
        description: 'Brick manufacturing emission monitoring and seasonal analysis',
        icon: 'mdi-chart-areaspline'
      }
    ],
    imagePath: new URL('../assets/method/method_brick.png', import.meta.url).href,
    references: [
      'Goldmann C. and Arora S., et al. (2025). CHETNA-Brick Sector, EGU25',
    ],
    refLinks: [
      'https://hal.science/hal-05059154/',
    ]
  }
} 