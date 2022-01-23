import firebase from 'firebase/compat/app'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  list,
} from 'firebase/storage'
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

export async function loadPostContent(section, fileContainer) {
  let postDataContainer = []
  let promiseArray = []
  const rootRef = ref(storage, `${section}`)
  list(rootRef).then((postPrefixesContainer) => {
    postPrefixesContainer.prefixes.forEach((prefix) => {
      promiseArray.push(list(prefix))
    })
    Promise.all(promiseArray).then((itemContainer) => {
      promiseArray = []
      let downloadPromiseArray = []
      let fileArray = []
      itemContainer.forEach((filesContainer) => {
        filesContainer.items.forEach((file) => {
          fileArray.push(file)
          // getDownloadURL(file).then((data) => {
          //   console.log(file, '  ', data)
          // })
          promiseArray.push(getMetadata(file))
          // downloadPromiseArray.push(getDownloadURL(file))
        })
      })

      Promise.all(promiseArray).then((values) => {
        values.forEach((fileMetadata) => {
          const url = fileMetadata.customMetadata.ref

          fileArray.forEach((file) => {
            console.log(url.match(file.fullPath))
          })
        })
      })
    })
  })
}
