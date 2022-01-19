import firebase from 'firebase/compat/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Post } from '../essenses/post'
// import { appendChild } from 'domutils'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyBd47pDOwXOBjmLwWclzincO3mpTpkSYGk',
  authDomain: 'mealreviewer.firebaseapp.com',
  projectId: 'mealreviewer',
  storageBucket: 'mealreviewer.appspot.com',
  messagingSenderId: '509649353294',
  appId: '1:509649353294:web:385fc8786713e6bf9ba11f',
  measurementId: 'G-XX9ML2K4FV',
}
const app = firebase.initializeApp(firebaseConfig)

const storage = getStorage(app)

export function loadContent(section) {
  const sectionRef = ref(storage, `${section}/`)

  // Get the download URL
  getDownloadURL(sectionRef)
    .then((url) => {
      // Insert url into an <img> tag to "download"
      console.log(url)
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          console.log('storage/object-not-found')
          break
        case 'storage/unauthorized':
          console.log('storage/unauthorized')
          // User doesn't have permission to access the object
          break
        case 'storage/canceled':
          console.log('storage/canceled')
          // User canceled the upload
          break

        // ...

        case 'storage/unknown':
          console.log('storage/unknown')
          // Unknown error occurred, inspect the server response
          break
      }
    })
}
