/**
 * News Page Data
 * Contains project timeline and news articles for the news page
 */

// Project Timeline Data
export const projectTimeline = [
  {
    icon: 'mdi-rocket-launch',
    title: 'Project Initiation',
    description: 'CHETNA project officially launched with initial funding and team formation',
    yearMonth: '2023-01',
    breakdownTasks: [
      'Secure initial funding from partner institutions',
      'Establish core research team',
      'Define project scope and objectives',
      'Set up administrative infrastructure'
    ]
  },
  {
    icon: 'mdi-database',
    title: 'Data Collection Phase',
    description: 'Comprehensive data gathering from multiple sources across Indian cities',
    yearMonth: '2023-06',
    breakdownTasks: [
      'Establish data collection protocols',
      'Partner with local data providers',
      'Set up data validation processes',
      'Begin satellite data acquisition'
    ]
  },
  {
    icon: 'mdi-brain',
    title: 'AI Model Development',
    description: 'Development of machine learning algorithms for emission estimation',
    yearMonth: '2024-01',
    breakdownTasks: [
      'Design neural network architectures',
      'Train models on historical data',
      'Validate model accuracy',
      'Optimize for real-time processing'
    ]
  },
  {
    icon: 'mdi-map-marker-multiple',
    title: 'City Mapping & Analysis',
    description: 'High-resolution mapping of 100+ Indian cities for emission tracking',
    yearMonth: '2024-06',
    breakdownTasks: [
      'Create detailed city boundaries',
      'Map infrastructure and facilities',
      'Analyze spatial emission patterns',
      'Generate city-specific reports'
    ]
  },
  {
    icon: 'mdi-chart-line',
    title: 'Real-time Monitoring',
    description: 'Launch of real-time emission monitoring system',
    yearMonth: '2024-12',
    breakdownTasks: [
      'Deploy monitoring infrastructure',
      'Establish data transmission protocols',
      'Create real-time dashboards',
      'Begin continuous data collection'
    ]
  },
  {
    icon: 'mdi-earth',
    title: 'Public Launch',
    description: 'Official launch of CHETNA platform for public access',
    yearMonth: '2025-03',
    breakdownTasks: [
      'Complete platform development',
      'Conduct user testing',
      'Prepare launch materials',
      'Establish support systems'
    ]
  },
  {
    icon: 'mdi-trending-up',
    title: 'Ongoing Research',
    description: 'Continuous research and platform improvements',
    yearMonth: '2025-06',
    breakdownTasks: [
      'Monitor system performance',
      'Update emission models',
      'Expand city coverage',
      'Publish research findings'
    ]
  }
]

// News Articles Data
export const newsArticles = [
  {
    image_path: new URL('../assets/new_images/1.jpg', import.meta.url).href,
    title: 'Year in Review: Global carbon emissions and decarbonization in 2024',
    subtitle: 'January 15, 2025 | CHETNA Research Team',
    description_short: 'Global CO2 emissions for 2024 increased by 0.9% relative to 2023, reaching 36.3 Gt CO2.',
    description_full: 'Our comprehensive analysis reveals that global CO2 emissions for 2024 increased by 0.9% relative to 2023, reaching 36.3 Gt CO2. This increase was primarily driven by growth in fossil fuel use in emerging economies, particularly in India and China. However, the rate of increase has slowed compared to previous years, indicating progress in decarbonization efforts. The report highlights significant regional variations and identifies key sectors requiring immediate attention for climate mitigation.',
    outside_link: 'https://www.nature.com/articles/s41558-024-01984-4'
  },
  {
    image_path: new URL('../assets/new_images/2.jpg', import.meta.url).href,
    title: 'New Methodology for Urban Emission Monitoring',
    subtitle: 'March 15, 2025 | Dr. Abhinav Sharma',
    description_short: 'Our research team has developed innovative AI-powered algorithms for more accurate urban emission tracking.',
    description_full: 'We have developed a breakthrough methodology that combines satellite data, ground-based measurements, and machine learning algorithms to provide unprecedented accuracy in urban emission monitoring. The new system improves data resolution by 40% and enables more precise policy recommendations. This methodology is now being implemented across all 100+ Indian cities in our network.',
    outside_link: ''
  },
  {
    image_path: new URL('../assets/new_images/3.jpg', import.meta.url).href,
    title: 'Multi-Sector Analysis Insights',
    subtitle: 'February 28, 2025 | Dr. Philippe Ciais',
    description_short: 'Comprehensive analysis reveals the complex interplay between industrial development and environmental sustainability.',
    description_full: 'Our latest multi-sector analysis provides deep insights into the complex relationship between industrial development and environmental sustainability in Indian cities. The study covers power generation, transportation, residential, industrial, and aviation sectors, revealing critical patterns and opportunities for emission reduction while maintaining economic growth.',
    outside_link: ''
  },
  {
    image_path: '',
    title: 'India\'s Digital Transformation: A Comprehensive Analysis',
    subtitle: 'January 15, 2024 | Dr. Priya Sharma',
    description_short: 'Exploring the rapid digital adoption across various sectors and its impact on economic growth and social development.',
    description_full: 'This comprehensive analysis examines India\'s rapid digital transformation across various sectors including healthcare, education, finance, and governance. The study reveals significant improvements in service delivery and efficiency, while also identifying areas where digital adoption can further accelerate sustainable development goals.',
    outside_link: ''
  },
  {
    image_path: '',
    title: 'Sustainable Development Goals: India\'s Progress Report',
    subtitle: 'January 10, 2024 | Rajesh Kumar',
    description_short: 'An in-depth analysis of India\'s progress towards achieving the United Nations Sustainable Development Goals.',
    description_full: 'Our detailed progress report on India\'s journey towards achieving the UN Sustainable Development Goals reveals significant advances in several key areas, including renewable energy adoption, poverty reduction, and education access. However, challenges remain in areas such as air quality and waste management.',
    outside_link: ''
  },
  {
    image_path: '',
    title: 'Healthcare Infrastructure: Challenges and Opportunities',
    subtitle: 'January 5, 2024 | Anita Patel',
    description_short: 'Examining the current state of healthcare infrastructure and identifying key areas for improvement and investment.',
    description_full: 'This study provides a comprehensive assessment of India\'s healthcare infrastructure, identifying critical gaps and opportunities for improvement. The analysis covers both urban and rural healthcare systems, with specific recommendations for infrastructure development and policy interventions.',
    outside_link: ''
  },
  {
    image_path: '',
    title: 'Data Visualization for Climate Policy',
    subtitle: 'December 20, 2024 | CHETNA Team',
    description_short: 'Advanced data visualization tools help policymakers understand emission patterns and implement targeted strategies.',
    description_full: 'We have developed advanced data visualization tools that transform complex emission data into intuitive, actionable insights for policymakers. These tools enable real-time monitoring of emission trends and provide scenario analysis for policy planning.',
    outside_link: ''
  },
  {
    image_path: '',
    title: 'Urban Air Quality: Real-time Monitoring Network',
    subtitle: 'December 10, 2024 | Dr. Clement',
    description_short: 'Launch of comprehensive real-time air quality monitoring network across major Indian cities.',
    description_full: 'CHETNA has successfully launched a comprehensive real-time air quality monitoring network across major Indian cities. This network provides continuous data on various air pollutants, enabling better understanding of air quality patterns and supporting evidence-based policy making.',
    outside_link: ''
  }
]

// Categories for news filtering
export const newsCategories = [
  {
    name: 'Research',
    count: 8,
    icon: 'mdi-microscope',
    color: 'primary'
  },
  {
    name: 'Technology',
    count: 6,
    icon: 'mdi-laptop',
    color: 'secondary'
  },
  {
    name: 'Policy',
    count: 5,
    icon: 'mdi-file-document',
    color: 'success'
  },
  {
    name: 'Environment',
    count: 7,
    icon: 'mdi-leaf',
    color: 'info'
  },
  {
    name: 'Infrastructure',
    count: 4,
    icon: 'mdi-city',
    color: 'warning'
  }
] 