// Get elements from DOM
const elementsFilter = document.querySelectorAll('.filter')
const buttonLog = document.getElementById('loginButton')
const formLog = document.querySelector('.login-form')
const elementEmail = document.getElementById('email')
const elementPwd = document.getElementById('password')
const elementLoglink = document.getElementById('log-link')
const elementHeader = document.querySelector('header')
let elementModalGallery = ''
let elementGallery = ''

// Check login state
if (window.sessionStorage.getItem('token') !== null) {
    addBanner()
    switchLink()
    hideFilters()
    addEdit()
}

// Switch between login and logout function
function switchLink() {
    const logoutLink = document.createElement('li')
    logoutLink.setAttribute('id', 'log-link')
    logoutLink.innerHTML =
        "<span onclick='logoutUser()' tabindex='0'>logout</span>"
    let parentDiv = elementLoglink.parentElement
    parentDiv.replaceChild(logoutLink, elementLoglink)
}
// Add banner "Edit mode" function
function addBanner() {
    let bannerContent = document.createElement('div')
    bannerContent.classList.add('editBanner')
    bannerContent.innerHTML = `<i class='fa-regular fa-pen-to-square'></i>
	<p>Mode édition</p>`
    let body = elementHeader.parentElement
    body.insertBefore(bannerContent, elementHeader)
}

// Hide filters function (to keep space between h2 and gallery)
function hideFilters() {
    for (let index = 0; index < elementsFilter.length; index++) {
        elementsFilter[index].hidden = true
    }
}

// Add "Edit" button
function addEdit() {
    const editButton =
        "<a href='#modal-edit' class='edit-gallery'><i class='fa-regular fa-pen-to-square'></i></a>"
    const elementTitleProject = document.querySelector('.title-project')
    elementTitleProject.innerHTML += editButton
}

// Logout function
function logoutUser() {
    window.sessionStorage.removeItem('token')
    window.location.href = 'http://localhost:5500/FrontEnd/index.html'
}

// Get JSON Array
getData(baseUrl + works, 0).then((data) => {
    createHTML(data, 'Main')
})

// Create HTML function
function createHTML(array, style) {
    elementModalGallery = document.querySelector('.mini-gallery')
    elementGallery = document.querySelector('.gallery')
    let contentHTML = ''
    switch (style) {
        case 'Main':
            array.map((e) => {
                contentHTML += `<figure>
				<img src="${e.imageUrl}" alt="${e.title}">
				<figcaption>${e.title}</figcaption>
			</figure>`
                elementGallery.innerHTML = contentHTML
            })
            contentHTML = ''
            break
        case 'Modal':
            array.map((e) => {
                contentHTML += `<figure id="${e.id}">
						<img src="${e.imageUrl}" alt="${e.title}">
						<i class="fa-solid fa-trash-can js-delete-work"></i>
					</figure>`
                elementModalGallery.innerHTML = contentHTML
            })
            contentHTML = ''
            break
        default:
            break
    }
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
