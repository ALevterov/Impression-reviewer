import './styles/styles.css'
import './styles/drinks.css'
import './styles/food.css'
import './styles/addposts.css'
import './user'
import { authWithEmailAndPass } from './auth'
import { drinksPageHandler } from './drinkspage'
import { foodPageHandler } from './foodpage'

const myModal = document.getElementById('myModal')

const signInBtn = document.getElementById('signIn')

const signIn = document.getElementById('enter')

function showModal() {
  myModal.style.display = 'block'
}
signInBtn.addEventListener('click', showModal)

function authFormHandler(event) {
  event.preventDefault()
  const emailInput = myModal.querySelector('#email-input')
  const passInput = myModal.querySelector('#password-input')

  const email = emailInput.value.trim()
  const password = passInput.value.trim()
  console.log(email, password)

  authWithEmailAndPass(email, password).then((token) => console.log(token))

  emailInput.value = ''
  passInput.value = ''
}

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
