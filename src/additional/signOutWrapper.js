import { getAuth, signOut } from 'firebase/auth'

export function signOutWrapper() {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      console.log('signout successeful')
    })
    .catch((error) => {
      console.log('signout error', error)
    })
}
