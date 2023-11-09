// Get elements from DOM
const elementGallery = document.querySelector('.gallery')

// Get JSON Array
getData(baseUrl + works).then((data) => {
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
