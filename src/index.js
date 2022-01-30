import './styles/styles.css'
import './styles/drinks.css'
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
const createUserBtn = document.getElementById('createUserBtn')

const toSignUpBtn = document.getElementById('toSignUpBtn')
const fromSignInToSignUpBtn = document.getElementById('fromSignInToSignUp')
// pages
const drinksPage = document.getElementById('drinks')

signInBtn.addEventListener('click', listeners.signInBtn)
signInModal.addEventListener('click', listeners.signInModal)
signInModal.addEventListener('click', listeners)

signUpBtn.addEventListener('click', listeners.signUpBtn)
signUpModal.addEventListener('click', listeners.signUpModal)

enterBtn.addEventListener('click', listeners.enterBtn)

createUserBtn.addEventListener('click', listeners.createUserBtn)

fromSignInToSignUpBtn.addEventListener('click', listeners.fromSignInToSignUp)

drinksPage.addEventListener('click', (event) => drinksPageHandler(event))
