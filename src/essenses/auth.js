import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { closeModal } from '../modal/closeModal'
import { onAuthStateChanged } from 'firebase/auth'
import { logInHandler } from '../signIn&Up/logInHandler'
import { signOutHandler } from '../signIn&Up/signOutHandler'
export function authFormHandler(event, modal) {
  event.preventDefault()
  const emailInput = modal.querySelector('#email-input-auth')
  const passInput = modal.querySelector('#password-input-auth')

  const email = emailInput.value.trim()
  const password = passInput.value.trim()
  const auth = getAuth()

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user

      onAuthStateChanged(auth, user => {
        if (user) {
          logInHandler()
        } else {
          signOutHandler()
        }
      })

      emailInput.value = ''
      passInput.value = ''
      closeModal(null, modal, true)
    })
    .catch(error => {
      alert('signIn error', error)
    })
}
