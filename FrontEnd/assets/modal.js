// Variables
let modal = null //contain the active modal node
const focusableSelector = 'i, a, .js-delete-work'
let focusablesElements = []

// Show Modal function
const showModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', dismissModal)
    modal.querySelector('.close').addEventListener('click', dismissModal)
    modal
        .querySelector('.modal-stop')
        .addEventListener('click', stopPropagation)
    getData(baseUrl + works, 0).then((data) => {
        createHTML(data, 'Modal')
        focusablesElements = Array.from(
            modal.querySelectorAll(focusableSelector)
        )
        // Setting tabIndex to active focusable on all tab elements
        focusablesElements.forEach((e) => {
            e.tabIndex = '-1'
        })
    })
}

// Dismiss Modal function
const dismissModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', dismissModal)
    modal.querySelector('.close').removeEventListener('click', dismissModal)
    modal
        .querySelector('.modal-stop')
        .removeEventListener('click', stopPropagation)
    elementModalGallery.innerHTML = ''
    modal = null
}

// Stop Propagation function
const stopPropagation = function (e) {
    e.stopPropagation()
}

// Add onClick event to show up modal
document.querySelector('.edit-gallery').addEventListener('click', showModal)

// keyboard events
window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        dismissModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
})

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusablesElements.findIndex(
        (focused) => focused === modal.querySelector(':focus')
    )
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusablesElements.length) {
        index = 0
    }
    if (index < 0) {
        index = focusablesElements.length - 1
    }

    focusablesElements[index].focus({ focusVisible: true })
}
