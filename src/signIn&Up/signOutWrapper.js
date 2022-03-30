import { getAuth, signOut } from 'firebase/auth'

export function signOutWrapper() {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      console.log('signout successeful')
    })
    .catch(error => {
      alert('signout error', error)
    })
}
