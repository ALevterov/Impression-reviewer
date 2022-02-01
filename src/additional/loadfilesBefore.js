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
    const postFiles = {}
    let promiseArray = []
    for (let j = 0; j < numberOfItems; j++) {
      const file = itemContainer.items[j]

      promiseArray.push(getMetadata(file))
      promiseArray.push(getDownloadURL(file))
    }
    Promise.all(promiseArray).then((urlsAndMeta) => {
      const length = urlsAndMeta.length

      for (let j = 0; j < length; j += 2) {
        const metaItem = urlsAndMeta[j]
        const downLoadUrl = urlsAndMeta[j + 1]
        const type = metaItem.customMetadata.type
        postFiles[type] = {}
        postFiles[type].metaData = metaItem.customMetadata
        fetch(downLoadUrl, { method: 'GET' })
          .then((response) => {
            return response.body.getReader().read()
          })
          .then((file) => {
            postFiles[type].file = file

            let img, header, description, plus, minus, date, starsCount

            for (let key of Object.keys(postFiles)) {
              const postFile = postFiles[key]
              if (!postFile.file) continue
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
            if (
              img &&
              header &&
              description &&
              plus &&
              minus &&
              starsCount &&
              date
            ) {
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
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  }
}
