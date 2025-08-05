# Data Files

This directory contains separated data files for the CHETNA website application. These files were extracted from the main store (`app.js`) to improve code organization and maintainability.

## Files

### `newsData.js`
Contains news-related data for the homepage:
- `latestNews`: Latest news information with title, date, summary, and link
- `carouselItems`: Array of carousel items for the homepage with images, descriptions, and links

### `newsPageData.js`
Contains comprehensive news page data:
- `projectTimeline`: Array of project milestones with icons, titles, descriptions, and breakdown tasks
- `newsArticles`: Array of news articles with image paths, titles, subtitles, descriptions, and outside links
- `newsCategories`: Array of news categories for filtering with names, counts, icons, and colors

### `pageDescriptions.js`
Contains page-specific descriptions for different routes:
- Homepage (`/`)
- Facts page (`/facts`)
- Methodology page (`/methodology`)
- People page (`/people`)
- News page (`/news`)

### `teamDescriptions.js`
Contains descriptions for different team institutes and collaborators:
- LSCE (Laboratoire des Sciences du Climat et de l'Environnement)
- IIT Bombay
- Nexqt
- Other Collaborators

### `methodPopups.js`
Contains methodology popup data for different sectors:
- Power generation
- Traffic emissions
- Residential emissions
- Industrial emissions
- Aviation emissions
- Brick manufacturing

Each sector includes:
- Title and styling information
- Cards with methodology details
- Image paths
- References and links

## Usage

These files are imported into the main store (`app.js`) and used throughout the application. The data is accessed via the Pinia store getters and actions.

## Benefits

- **Separation of Concerns**: Data is separated from application logic
- **Maintainability**: Easier to update content without touching application code
- **Reusability**: Data can be imported and used in other parts of the application
- **Version Control**: Changes to content are clearly tracked in separate files 