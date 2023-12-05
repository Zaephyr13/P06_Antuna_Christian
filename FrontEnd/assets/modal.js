// Variables
let modal = null //contain the active modal node
const focusableSelector = 'i, a, .js-delete-work'
let focusablesElements = []

// Show Modal function
const showModal = async function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', dismissModal)
    modal.querySelector('.fa-xmark').addEventListener('click', dismissModal)

    // Return button event listener
    const returnButton = modal.querySelector('.fa-arrow-left')
    if (returnButton !== null) {
        returnButton.addEventListener('click', (e) => {
            dismissModal(e)
            showModal(e)
        })
    }
    // "Ajouter une photo" button event listener
    const addButton = modal.querySelector('.add-work')
    if (addButton !== null) {
        addButton.addEventListener('click', (e) => {
            dismissModal(e)
            showModal(e)
        })
    }
    modal
        .querySelector('.modal-stop')
        .addEventListener('click', stopPropagation)
    getData(baseUrl + works, 0).then((data) => {
        createHTML(data, 'Modal')
        focusablesElements = Array.from(
            modal.querySelectorAll(focusableSelector)
        )
        // Setting tabIndex to active focusable on all "tab-able" elements
        focusablesElements.forEach((e) => {
            e.tabIndex = '-1'
        })

        // Bin buttons event listener
        const binButtons = modal.querySelectorAll('.js-delete-work')
        if (binButtons !== null) {
            for (let index = 0; index < binButtons.length; index++) {
                let id = binButtons[index].parentElement.id
                binButtons[index].addEventListener('click', (e) => {
                    e.preventDefault()
                    stopPropagation
                    deleteWork(id)
                    // getData(baseUrl + works, 0).then((data) => {
                    //     createHTML(data, 'Modal')
                    // })
                })
            }
        }
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
    modal.querySelector('.fa-xmark').removeEventListener('click', dismissModal)
    const returnButton = modal.querySelector('.fa-arrow-left')
    if (returnButton !== null) {
        returnButton.removeEventListener('click', showModal)
    }
    const addButton = modal.querySelector('.add-work')
    if (addButton !== null) {
        addButton.removeEventListener('click', showModal)
    }
    modal
        .querySelector('.modal-stop')
        .removeEventListener('click', stopPropagation)
    elementModalGallery.innerHTML = ''
    if (binButtons !== null) {
        for (let index = 0; index < binButtons.length; index++) {
            let id = binButtons[index].parentElement.id
            binButtons[index].removeEventListener('click', () => {
                deleteWork(id)
                getData(baseUrl + works, 0).then((data) => {
                    createHTML(data, 'Modal')
                })
            })
        }
    }
    modal = null
}

// Stop Propagation function
const stopPropagation = function (e) {
    e.stopPropagation()
}

// Add onClick event to show up modal
const editButton = document.querySelector('.edit-gallery')
if (editButton !== null) {
    editButton.addEventListener('click', showModal)
}

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
