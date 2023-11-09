// Server's base url and path
const baseUrl = 'http://localhost:5678/api'

const works = '/works'
const categories = '/categories'


// Get DB from API
async function getData(url) {
const response = await fetch(url)
    const jsonTab = await response.json()
    return jsonTab
}

// Add work to DB


// Delete work from DB


