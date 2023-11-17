// Get elements from DOM
const buttonLog = document.getElementById('loginButton')
const formLog = document.querySelector('.login-form')
const elementEmail = document.getElementById('email')
const elementPwd = document.getElementById('password')
const elementWarn = document.querySelector('.incorrect')

// Variables used in scripts
let flag = 0 // To prevent multiple creation of "incorrect" elements

// Refresh warning when user select Email or Password
elementEmail.addEventListener('select', removeWarn())
elementPwd.addEventListener('select', removeWarn())

// Remove "incorrect" function
function removeWarn() {
    if (elementWarn !== null) {
        formLog.removeChild(elementWarn)
        flag = 0
    }
}

// Login script
if (buttonLog !== null) {
    buttonLog.addEventListener('click', function (e) {
        e.preventDefault()
        const mail = elementEmail.value
        const pass = elementPwd.value
        getToken(mail, pass).then((status) => {
            if (status === true) {
                flag = 0
                window.location.href =
                    'http://localhost:5500/FrontEnd/index.html'
            } else if (flag === 0) {
                const pElement = document.createElement('p')
                pElement.classList.add('incorect')
                pElement.innerText =
                    'La combinaison "Utilisateur/Mot de Passe" est incorrecte.'
                formLog.insertBefore(pElement, buttonLog)
                flag = 1
            }
        })
    })
}
