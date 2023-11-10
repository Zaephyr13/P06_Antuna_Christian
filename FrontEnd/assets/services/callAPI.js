// Server's base url and path
const baseUrl = 'http://localhost:5678/api'

const works = '/works'
const categories = '/categories'

let dataSort = []

// Get DB from API
async function getData(url, id) {
    const response = await fetch(url)
    const jsonTab = await response.json()
    if (id === 0) {
        dataSort = [...jsonTab]
    } else {
        dataSort = jsonTab.filter(function (work) {
            return work.categoryId === id
        })
    }
    return dataSort
}

// Add work to DB

// Delete work from DB
