import firebase from 'firebase/compat/app'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
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
console.log('storage!!: ', storage)

export async function loadPostContent(section, post) {
  let fileContainer = []
  const rootRef = ref(storage, `${section}`)
  const sectionRef = ref(
    storage,
    `${section}/${post}//xps-kLfkVa_4aXM-unsplash.jpg`
  )
  /// ==============
  await listAll(rootRef).then((rootPrefix) => {
    rootPrefix.prefixes.forEach((pref) => {
      let tempObj
      listAll(pref).then((post) => {
        //в post содержатся файлы поста
        tempObj = {}
        post.items.forEach((item, index) => {
          getDownloadURL(item)
            .then((url) => {
              if (url.match('description')) {
                tempObj.description = url
              } else if (url.match(/(jpg)|(jpeg)|(png)|(gif)/)) {
                tempObj.img = url
              } else {
                tempObj.header = url
              }
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
        })
      })
      fileContainer.push(tempObj)
      console.log(fileContainer.length)
      // const xhr = new XMLHttpRequest()
      //         xhr.responseType = 'blob'
      //         xhr.onload = (event) => {
      //           const blob = xhr.response

      //         }
      //         xhr.open('GET', url)
      //         xhr.send()
    })
  })
  return fileContainer
}
