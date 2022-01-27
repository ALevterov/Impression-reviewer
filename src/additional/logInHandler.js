import { listeners } from './eventListeners'
export function logInHandler() {
  const signUpBtn = document.getElementById('signUpBtn')
  const signInBtn = document.getElementById('signInBtn')

  signUpBtn.removeEventListener('click', listeners.signUpBtn)
  signUpBtn.addEventListener('click', listeners.signOutHandler)
  signUpBtn.id = 'logOutBtn'
  signUpBtn.innerHTML = 'Выйти'

  signInBtn.removeEventListener('click', listeners.signInBtn)
  signInBtn.addEventListener('click', listeners.myProfile)
  signInBtn.id = 'myProfileBtn'
  signInBtn.innerHTML = 'Мой профиль'
}
