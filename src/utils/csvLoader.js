/**
 * CSV Loader Utility
 * Provides functions to load CSV files from assets and convert them to string format
 */

/**
 * Load CSV file from assets folder
 * @param {string} filePath - Path to CSV file relative to assets folder
 * @returns {Promise<string>} CSV content as string
 */
export const loadCSVFromAssets = async (filePath) => {
  try {
    // Import the CSV file dynamically
    const module = await import(`../assets/${filePath}`)
    return module.default
  } catch (error) {
    console.error('Error loading CSV file:', error)
    throw error
  }
}

/**
 * Load CSV file using fetch (for files in public folder or external URLs)
 * @param {string} url - URL to the CSV file
 * @returns {Promise<string>} CSV content as string
 */
export const loadCSVFromURL = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.text()
  } catch (error) {
    console.error('Error fetching CSV file:', error)
    throw error
  }
}

/**
 * Parse CSV string to array of objects
 * @param {string} csvText - Raw CSV text
 * @returns {Array} Parsed data array
 */
export const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.replace(/"/g, ''))
  const result = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.replace(/"/g, ''))
    const row = {}
    headers.forEach((header, index) => {
      row[header] = values[index]
    })
    result.push(row)
  }
  
  return result
} 