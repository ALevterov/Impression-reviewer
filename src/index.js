import './styles/styles.css'
import './styles/drinks.css'
import './styles/addposts.css'
import './essenses/user'
import { drinksPageHandler } from './pages/drinkspage'
import { listeners } from './additional/eventListeners'

// signIn
const signInModal = document.getElementById('signInModal')
const signInBtn = document.getElementById('signInBtn')
const enterBtn = document.getElementById('enterBtn')
// signUp
const signUpModal = document.getElementById('signUpModal')
const signUpBtn = document.getElementById('signUpBtn')
const createUserBtn = document.getElementById('createUser')
// pages
const drinksPage = document.getElementById('drinks')

signInBtn.addEventListener('click', listeners.signInBtn)
signInModal.addEventListener('click', listeners.signInModal)

signUpBtn.addEventListener('click', listeners.signUpBtn)
signUpModal.addEventListener('click', listeners.signUpModal)

enterBtn.addEventListener('click', listeners.enterBtn)

createUserBtn.addEventListener('click', listeners.createUserBtn)

drinksPage.addEventListener('click', (event) => drinksPageHandler(event))
