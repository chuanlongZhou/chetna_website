// Utilities
import { defineStore } from 'pinia'
// Data imports
import { latestNews, carouselItems } from '../data/newsData.js'
import { pageDescriptions } from '../data/pageDescriptions.js'
import { teamDescriptions } from '../data/teamDescriptions.js'
import { methodPopups } from '../data/methodPopups.js'
import { projectTimeline, newsArticles } from '../data/newsPageData.js'

// note: why we need to use new URL()?
// answer: new URL() is used to create a URL object from a string.
// we need to use it because the image paths are relative paths and we need to convert them to absolute paths.
// we need to use it because the image paths are relative paths and we need to convert them to absolute paths.

export const useAppStore = defineStore('app', {
  state: () => ({
    // Logo hover state - can be used across all components
    isLogoHovered: false,
    
    // Navigation state
    isScrolled: false,
    drawer: false,
    
    // Navigation items - centralized data
    navigationItems: [
      {
        title: 'City Data',
        to: '/',
        icon: 'mdi-city'
      },
      {
        title: 'Facts of India',
        to: '/facts',
        icon: 'mdi-om'
      },
      {
        title: 'Methodology',
        to: '/methodology',
        icon: 'mdi-memory'
      },
      {
        title: 'Who We Are',
        to: '/people',
        icon: 'mdi-account-group'
      },
      {
        title: 'News',
        to: '/news',
        icon: 'mdi-newspaper-variant-outline'
      }
    ],
    
    // Imported data from separate files
    latestNews,
    carouselItems,
    pageDescriptions,
    teamDescriptions,
    methodPopups,
    projectTimeline,
    newsArticles,
    
    // Gallery configuration
    totalGalleryImages: 11,
    
    // Selected cities state - allows max 6 elements
    selected_city: []
  }),
  
  getters: {
    // Get current page description based on route
    currentPageDescription: (state) => (routePath) => {
      return state.pageDescriptions[routePath] || state.pageDescriptions['/']
    },
    
    // Get active navigation item
    activeNavigationItem: (state) => (routePath) => {
      return state.navigationItems.find(item => item.to === routePath)
    },
    
    // Get method popup data by sector
    getMethodPopup: (state) => (sector) => {
      return state.methodPopups[sector] || null
    }
  },
  
  actions: {
    // Logo hover actions
    setLogoHovered(hovered) {
      this.isLogoHovered = hovered
    },
    
    // Scroll state actions
    setScrolled(scrolled) {
      this.isScrolled = scrolled
    },
    
    // Drawer actions
    setDrawer(open) {
      this.drawer = open
    },
    
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    
    // Navigation actions
    updateNavigationItems(items) {
      this.navigationItems = items
    },
    
    // News actions
    updateLatestNews(news) {
      this.latestNews = news
    },
    
    // Carousel content actions
    updateCarouselItems(items) {
      this.carouselItems = items
    },
    
    addCarouselItem(item) {
      this.carouselItems.push(item)
    },
    
    // Page description actions
    updatePageDescriptions(descriptions) {
      this.pageDescriptions = { ...this.pageDescriptions, ...descriptions }
    },
    
    // Read news function
    readNews() {
      // Navigate to news page or open news article
      window.open(this.latestNews.link, '_blank')
    },
    
    // Handle carousel item click
    handleCarouselItemClick(item) {
      if (item.link) {
        window.open(item.link, '_blank')
      }
    },
    
    // Method popup actions
    updateMethodPopups(popups) {
      this.methodPopups = { ...this.methodPopups, ...popups }
    },
    
    addMethodPopup(sector, popupData) {
      this.methodPopups[sector] = popupData
    },
    
    // Selected city actions
    addSelectedCity(city) {
      // Remove city if it already exists to avoid duplicates
      this.selected_city = this.selected_city.filter(c => c !== city)
      
      // Add city to the beginning of the array
      this.selected_city.unshift(city)
      
      // Keep only the first 6 elements
      if (this.selected_city.length > 7) {
        this.selected_city = this.selected_city.slice(0, 7)
      }
      
      console.log('Selected cities:', this.selected_city)
    },
    
    clearSelectedCities() {
      this.selected_city = []
    },
    
    removeSelectedCity(city) {
      this.selected_city = this.selected_city.filter(c => c !== city)
    }
  }
})
