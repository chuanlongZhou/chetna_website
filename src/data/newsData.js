/**
 * News and Carousel Data
 * Contains latest news information and carousel items for the website
 */

// Latest news data
export const latestNews = {
  title: 'Year in Review: Global carbon emissions and decarbonization in 2024',
  date: '11/04/2025',
  summary: 'Global CO2 emissions for 2024 increased by 0.9% relative to 2023, reaching 36.3 Gt CO2. Check our paper on Nature Reviews: Earth & Environment',
  link: '/news'
}

// Carousel items with separated descriptions
export const carouselItems = [
  {
    title: 'Year in Review: Global carbon emissions and decarbonization in 2024',
    date: '11/04/2025',
    description1: 'Global CO2 emissions for 2024 increased by 0.9% relative to 2023, reaching 36.3 Gt CO2.',
    image: new URL('../assets/new_images/1.jpg', import.meta.url).href,
    imageHeight: 150,
    description2: 'Check our paper on Nature Reviews: Earth & Environment',
    link: '/news'
  },
  {
    image: new URL('../assets/new_images/1.jpg', import.meta.url).href,
    imageHeight: 275,
    description2: 'This provides crucial data for climate policy decisions and helps cities develop targeted mitigation strategies.'
  },
  {
    title: 'New Methodology for Urban Emission Monitoring',
    date: '15/03/2025',
    description1: 'Our research team has developed innovative AI-powered algorithms for more accurate urban emission tracking.',
    image: new URL('../assets/new_images/2.jpg', import.meta.url).href,
    imageHeight: 275,
    description2: 'The new methodology improves data resolution by 40% and enables more precise policy recommendations.',
    link: '/methodology'
  },
  {
    title: 'Multi-Sector Analysis Insights',
    description1: 'Comprehensive analysis reveals the complex interplay between industrial development and environmental sustainability.',
    image: new URL('../assets/new_images/3.jpg', import.meta.url).href,
    imageHeight: 275,
    description2: 'Our findings help policymakers balance economic growth with environmental protection in rapidly growing urban centers.'
  },
  {
    title: 'Data Visualization for Climate Policy',
    description1: 'Advanced data visualization tools help policymakers understand emission patterns and implement targeted strategies.',
    image: new URL('../assets/new_images/1.jpg', import.meta.url).href,
    imageHeight: 275,
    description2: 'Interactive dashboards provide real-time insights for effective climate mitigation planning.'
  }
] 