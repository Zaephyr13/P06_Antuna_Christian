// Server's base url and path
const baseUrl = 'http://localhost:5678/api'

const works = '/works'
const categories = '/categories'
const login = '/users/login'

let dataSort = []
let dataCat = []

// Get DB from API + Sort function
async function getData(url, id) {
    try {
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
    } catch (error) {
        console.error(`Une erreur s'est produite: ${error.message}`)
    }
}

// Login to site
async function getToken(email, password) {
    let jsonBody = {
        email: email,
        password: password,
    }
    try {
        const res = await fetch(baseUrl + login, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonBody), // Syntaxe : '{"email" : "blabla@gneu.com", "password" : "Rrrrr"}' (Must to be string)
        })
        const resJson = await res.json()
        if (res.ok) {
            const token = resJson.token
            sessionStorage.setItem('token', token)
        }
        return res.ok
    } catch (error) {
        console.error(`Une erreur s'est produite: ${error.message}`)
    }
}

// Delete work from DB
async function deleteWork(id) {
    try {
        const token = window.sessionStorage.getItem('token')
        fetch(baseUrl + works + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.status === 204) {
                alert('Travail Supprimé')
            }
        })
    } catch (error) {
        console.error(`Une erreur s'est produite: ${error.message}`)
    }
}

// Add work to DB
async function addWork(e, bodyData) {
    e.preventDefault()
    try {
        const token = window.sessionStorage.getItem('token')
        await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: bodyData,
        }).then((res) => {
            if (res.status === 201) {
                alert('Travail Ajouté')
            }
        })
    } catch (error) {
        console.error(`Une erreur s'est produite: ${error.message}`)
    }
}

// Get categories from DB
async function getCategory() {
    const response = await fetch('http://localhost:5678/api/categories')
    dataCat = await response.json()
}
