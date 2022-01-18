import './styles/styles.css'
import './styles/drinks.css'
import './styles/food.css'
import './styles/addposts.css'
import './user'
import { authFormHandler } from './auth'
import { drinksPageHandler } from './drinkspage'
import { foodPageHandler } from './foodpage'

import firebase from 'firebase/compat/app'
import { getStorage } from 'firebase/storage'
import { appendChild } from 'domutils'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyBd47pDOwXOBjmLwWclzincO3mpTpkSYGk',
  authDomain: 'mealreviewer.firebaseapp.com',
  projectId: 'mealreviewer',
  storageBucket: 'mealreviewer.appspot.com',
  messagingSenderId: '509649353294',
  appId: '1:509649353294:web:385fc8786713e6bf9ba11f',
  measurementId: 'G-XX9ML2K4FV',
}
const app = firebase.initializeApp(firebaseConfig)

const storage = getStorage(app)

const myModal = document.getElementById('myModal')

const signInBtn = document.getElementById('signIn')

const signIn = document.getElementById('enter')

let drinksId = 0
function showModal() {
  myModal.style.display = 'block'
}
signInBtn.addEventListener('click', showModal)

myModal.addEventListener('click', (event) => {
  console.log(event.target.dataset['data-closable'])
  if (event.target.dataset['closable']) {
    myModal.style.display = 'none'
  }
})

signIn.addEventListener('click', (event) => authFormHandler(event))

const drinksPage = document.getElementById('drinks')

const eatPage = document.getElementById('food')

drinksPage.addEventListener('click', (event) => {
  drinksPageHandler(event)
})

eatPage.addEventListener('click', (event) => {
  foodPageHandler(event)
})
