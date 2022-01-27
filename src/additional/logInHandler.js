import { listeners } from './eventListeners'
export function logInHandler() {
  const signUpBtn = document.getElementById('signUpBtn')
  const signInBtn = document.getElementById('signInBtn')

  signUpBtn.removeEventListener('click', listeners.signUpBtn)
  signUpBtn.addEventListener('click', listeners.myProfile)
  signUpBtn.id = 'logOutBtn'
  signUpBtn.innerHTML = 'Мой профиль'

  signInBtn.removeEventListener('click', listeners.signInBtn)
  signInBtn.addEventListener('click', listeners.signOutHandler)
  signInBtn.id = 'myProfileBtn'
  signInBtn.innerHTML = 'Выйти'
}
