// Get elements from DOM
const elementGallery = document.querySelector('.gallery')
const elementsFilter = document.querySelectorAll('.filter')

// Get JSON Array
getData(baseUrl + works, 0).then((data) => {
    createHTML(data)
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
