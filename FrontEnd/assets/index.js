// Get elements from DOM
const elementGallery = document.querySelector('.gallery')
const elementsFilter = document.querySelectorAll('.filter')
const buttonLog = document.getElementById('loginButton')
const formLog = document.querySelector('.login-form')
const elementEmail = document.getElementById('email')
const elementPwd = document.getElementById('password')
const elementLoglink = document.getElementById('log-link')
let userLog = false

// Save login state
if (window.sessionStorage.getItem('token') !== null) {
    userLog = true
} else {
    userLog = false
}

// Switch between login and logout
function switchLog(logState) {
    if (logState) {
        const logoutLink = document.createElement('li')
        logoutLink.setAttribute('id', 'log-link')
        logoutLink.innerHTML = "<span onclick='logoutUser()'>logout</span>"
        parentDiv = elementLoglink.parentElement
        parentDiv.replaceChild(logoutLink, elementLoglink)
    }
}

switchLog(userLog)

// Logout function
function logoutUser() {
    window.sessionStorage.removeItem('token')
    window.location.href = 'http://localhost:5500/FrontEnd/index.html'
}

// Get JSON Array
getData(baseUrl + works, 0).then((data) => {
    if (elementGallery !== null) {
        createHTML(data)
    }
})

// Create HTML function
function createHTML(array) {
    let contentHTML = ''
    array.map((e) => {
        contentHTML += `<figure>
				<img src="${e.imageUrl}" alt="${e.title}">
				<figcaption>${e.title}</figcaption>
			</figure>`
        elementGallery.innerHTML = contentHTML
    })
}

// Remove class selected on all buttons
function removeSelected() {
    elementsFilter.forEach((button) => {
        button.classList.remove('selected')
    })
}

// Add listeners to filters
elementsFilter.forEach((button, index) => {
    button.addEventListener('click', function (e) {
        removeSelected()
        button.classList.add('selected')
        getData(baseUrl + works, index).then((data) => {
            createHTML(data)
        })
    })
})
