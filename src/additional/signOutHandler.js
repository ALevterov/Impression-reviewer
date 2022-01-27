import { listeners } from './eventListeners'
export function signOutHandler() {
  const logOutBtn = document.getElementById('logOutBtn')
  const myProfileBtn = document.getElementById('myProfileBtn')

  logOutBtn.removeEventListener('click', listeners.myProfile)
  logOutBtn.addEventListener('click', listeners.signUpBtn)
  logOutBtn.id = 'signUpBtn'
  logOutBtn.innerHTML = 'Регистрация'

  myProfileBtn.removeEventListener('click', listeners.signOutHandler)
  myProfileBtn.addEventListener('click', listeners.signInBtn)
  myProfileBtn.id = 'signInBtn'
  myProfileBtn.innerHTML = 'Вход'
}
