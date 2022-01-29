import { listeners } from '../additional/eventListeners'
export function logInHandler() {
  const signUpBtn = document.getElementById('signUpBtn')
  const signInBtn = document.getElementById('signInBtn')

  signUpBtn.removeEventListener('click', listeners.signUpBtn)
  signUpBtn.addEventListener('click', listeners.signOutHandler)
  signUpBtn.id = 'logOutBtn'
  signUpBtn.innerHTML = `<a href="#" class="btn btn-sm animated-button sandy-one">Выйти</a>`

  signInBtn.removeEventListener('click', listeners.signInBtn)
  signInBtn.addEventListener('click', listeners.myProfile)
  signInBtn.id = 'myProfileBtn'
  signInBtn.innerHTML = `<a href="#" class="btn btn-sm animated-button sandy-one">Мой профиль</a>`
}
