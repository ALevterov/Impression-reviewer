import firebase from 'firebase/compat/app'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  list,
} from 'firebase/storage'
import { blobTo } from './blobTo'
import { createPostItem } from './createPost'

const firebaseConfig = {
  apiKey: 'AIzaSyDaL-jRvZOfqqXOYmET1IwSc0BkNY-2Lgw',
  authDomain: 'impressionreviewer.firebaseapp.com',
  projectId: 'impressionreviewer',
  storageBucket: 'impressionreviewer.appspot.com',
  messagingSenderId: '620669256490',
  appId: '1:620669256490:web:c68ef96b8a8573d0d9d453',
  measurementId: 'G-SP7DX06ZZX',
}
const app = firebase.initializeApp(firebaseConfig)

const storage = getStorage(app)

export async function loadPostContent(section, postContainer) {
  const rootRef = ref(storage, `${section}`)
  const postPrefixContainer = await list(rootRef)
  const numberOfPosts = postPrefixContainer.prefixes.length
  for (let i = 0; i < numberOfPosts; i++) {
    const prefix = postPrefixContainer.prefixes[i]
    const itemContainer = await list(prefix)
    const numberOfItems = itemContainer.items.length
    console.log(numberOfItems)
    const postFiles = {}
    let counter = 0
    for (let j = 0; j < numberOfItems; j++) {
      const file = itemContainer.items[j]
      let type
      getMetadata(file)
        .then((fileMeta) => {
          type = fileMeta.customMetadata.type

          postFiles[type] = {}
          postFiles[type].metaData = fileMeta.customMetadata
          // console.log('file1')
          return file
        })
        .then((file) => {
          // console.log('file2')
          counter++
          return getDownloadURL(file)
        })
        .then((downLoadUrl) => {
          return fetch(downLoadUrl, { method: 'GET' })
        })
        .then((response) => {
          return response.body.getReader().read()
        })
        .then((file) => {
          postFiles[type].file = file
          return postFiles
        })
        .then((postFiles) => {
          // console.log(counter)
          // counter = 0
          let img, header, description, plus, minus, date, starsCount
          for (let key of Object.keys(postFiles)) {
            const postFile = postFiles[key]
            switch (key) {
              case 'image':
                img = blobTo(postFile.file.value, key)

                break
              case 'header':
                header = blobTo(postFile.file.value, key)
                starsCount = +postFile.metaData.starsCount
                date = +postFile.metaData.date

                break
              case 'description':
                description = blobTo(postFile.file.value, key)

                break
              case 'plus':
                plus = blobTo(postFile.file.value, key)

                break
              case 'minus':
                minus = blobTo(postFile.file.value, key)

                break
            }
          }
          postContainer.insertAdjacentHTML(
            'beforeend',
            createPostItem(
              img,
              header,
              description,
              plus,
              minus,
              starsCount,
              date
            )
          )
        })
        .catch((error) => {
          console.log('Такая вот ошибка', error)
        })
    }
  }
}
