import './styles/styles.css'
import './styles/drinks.css'
import './styles/addposts.css'
import './essenses/user'
import { authFormHandler } from './essenses/auth'
import { drinksPageHandler } from './pages/drinkspage'
import { foodPageHandler } from './pages/foodpage'

const myModal = document.getElementById('myModal')

const signInBtn = document.getElementById('signIn')

const signIn = document.getElementById('enter')

let drinksId = 0
function showModal() {
  myModal.style.display = 'block'
}
signInBtn.addEventListener('click', (event) => {
  event.preventDefault()
  showModal()
})

myModal.addEventListener('click', (event) => {
  event.preventDefault()
  console.log(event.target.dataset['data-closable'])
  if (event.target.dataset['closable']) {
    myModal.style.display = 'none'
  }
})

signIn.addEventListener('click', (event) => {
  event.preventDefault()
  authFormHandler(event)
})

const drinksPage = document.getElementById('drinks')

const eatPage = document.getElementById('food')

drinksPage.addEventListener('click', (event) => {
  event.preventDefault()
  drinksPageHandler(event)
})

eatPage.addEventListener('click', (event) => {
  event.preventDefault()
  foodPageHandler(event)
})
