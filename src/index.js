import './styles/styles.css'
import './styles/drinks.css'
import './essenses/user'
import { renderPostsPage } from './pages/renderPostsPage'
import { listeners } from './additional/eventListeners'
import { renderHomePage } from './pages/homepage'
import { authFormHandler } from './essenses/auth'

// signIn
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lds-ripple-container').remove()
  document.getElementById('header').style.display = 'block'
})
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
const homePage = document.getElementById('home-page')
const drinksPage = document.getElementById('drinks')
const foodPage = document.getElementById('food')
const weedPage = document.getElementById('weed')

const pageLoadingHandler = (event, topic) => {
  renderPostsPage(event, topic)
}

signInBtn.addEventListener('click', listeners.signInBtn)
signInModal.addEventListener('click', listeners.signInModal)

signUpBtn.addEventListener('click', listeners.signUpBtn)
signUpModal.addEventListener('click', listeners.signUpModal)

enterBtn.addEventListener('click', listeners.enterBtn)

createUserBtn.addEventListener('click', listeners.createUserBtn)

fromSignInToSignUpBtn.addEventListener('click', listeners.fromSignInToSignUp)

homePage.addEventListener('click', (event) => renderHomePage())
drinksPage.addEventListener('click', (event) =>
  pageLoadingHandler(event, 'drinkPosts')
)
foodPage.addEventListener('click', (event) =>
  pageLoadingHandler(event, 'foodPosts')
)
weedPage.addEventListener('click', (event) =>
  pageLoadingHandler(event, 'weedPosts')
)

const signInPassInput = document.getElementById('password-input-auth')
const signUpPassInput = document.getElementById('password-input-registr')

signInPassInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    authFormHandler(event, signInModal)
  }
})

signUpPassInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    authFormHandler(event, signUpModal)
  }
})
