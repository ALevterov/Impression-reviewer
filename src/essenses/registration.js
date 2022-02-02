import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { closeModal } from '../modal/closeModal'
import { onAuthStateChanged } from 'firebase/auth'
import { logInHandler } from '../signIn&Up/logInHandler'
import { signOutHandler } from '../signIn&Up/signOutHandler'
const auth = getAuth()
export function createUserHandler(event, modal) {
  event.preventDefault()
  const emailInput = modal.querySelector('#email-input')
  const passInput = modal.querySelector('#password-input')
  const userName = modal.querySelector('#username-input').value.trim()

  const auth = getAuth()
  const email = emailInput.value.trim()
  const password = passInput.value.trim()

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      updateProfile(user, { displayName: userName })
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User is loggedIn now!')
          logInHandler()
        } else {
          signOutHandler()
        }
      })

      emailInput.value = ''
      passInput.value = ''
      closeModal(null, modal, true)
    })
    .catch((error) => {
      alert('Create user error', error)
    })
}
