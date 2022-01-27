import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { closeModal } from '../additional/closeModal'
import { onAuthStateChanged } from 'firebase/auth'
import { logInHandler } from '../additional/logInHandler'
import { signOutHandler } from '../additional/signOutHandler'
export function authFormHandler(event, modal) {
  event.preventDefault()
  const emailInput = modal.querySelector('#email-input')
  const passInput = modal.querySelector('#password-input')

  const email = emailInput.value.trim()
  const password = passInput.value.trim()
  const auth = getAuth()

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user

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
      console.log('signIn error', error)
    })
}
