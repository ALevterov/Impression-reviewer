import firebase from 'firebase/compat/app'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  list,
} from 'firebase/storage'
import { blobTo } from '../additional/blobTo'
import { createPostItem } from '../additional/createPost'
// import { Post } from '../essenses/post'

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

export function loadPostContent(section, postContainer) {
  let promiseArray = []
  const rootRef = ref(storage, `${section}`)
  list(rootRef).then((postPrefixesContainer) => {
    postPrefixesContainer.prefixes.forEach((prefix) => {
      promiseArray.push(list(prefix))
    })
    Promise.all(promiseArray).then((itemContainer) => {
      promiseArray = []
      let downloadPromiseArray = []
      let postsTempContainer = {}
      let postsStructuredContainer = {}
      let fileArray = []
      let topic
      itemContainer.forEach((filesContainer) => {
        filesContainer.items.forEach((file) => {
          fileArray.push(file)

          promiseArray.push(getMetadata(file))
        })
      })

      Promise.all(promiseArray).then((values) => {
        promiseArray = []
        values.forEach((fileMetadata) => {
          const meta = fileMetadata.customMetadata
          let postObj = { ...meta }
          const url = meta.ref
          fileArray.forEach((file) => {
            if (url.match(file.fullPath)) {
              postObj.file = file
            }
          })
          topic = meta.topic
          postsTempContainer[`${meta.topic}/${meta.post}/${meta.type}`] =
            postObj
        })
        postsStructuredContainer[topic] = {}
        for (let key of Object.keys(postsTempContainer)) {
          const post = postsTempContainer[key]

          if (!postsStructuredContainer[topic][post.post])
            postsStructuredContainer[topic][post.post] = {}

          postsStructuredContainer[topic][post.post][post.type] = post
        }
        // в postsStructuredContainer содержатся файлы, распределенные по топику, посту и типу файла
        for (let postKey of Object.keys(postsStructuredContainer[topic])) {
          const topicFolder = postsStructuredContainer[topic]
          for (let fileKey of Object.keys(topicFolder[postKey])) {
            const post = topicFolder[postKey]
            let fileRef = post[fileKey].file
            promiseArray.push(getDownloadURL(fileRef))
          }
        }
        Promise.all(promiseArray).then((downloadLinks) => {
          promiseArray = []
          downloadLinks.forEach((url) => {
            promiseArray.push(fetch(url, { method: 'GET' }))
          })

          Promise.all(promiseArray).then((responses) => {
            promiseArray = []
            responses.forEach((response) => {
              promiseArray.push(response.body.getReader().read())
            })
            Promise.all(promiseArray).then((chunks) => {
              let i = 0
              while (i < chunks.length) {
                for (let postKey of Object.keys(
                  postsStructuredContainer[topic]
                )) {
                  const topicFolder = postsStructuredContainer[topic]
                  for (let fileKey of Object.keys(topicFolder[postKey])) {
                    const post = topicFolder[postKey][fileKey]
                    topicFolder[postKey][fileKey].file = chunks[i]
                    i++
                  }
                }
              }
              // теперь в поле file содержится Uint8Array! то есть сам файл
              // console.log(postsStructuredContainer)
              for (let postKey of Object.keys(
                postsStructuredContainer[topic]
              )) {
                const topicFolder = postsStructuredContainer[topic]
                let img, header, description, plus, minus, date, starsCount
                for (let fileKey of Object.keys(topicFolder[postKey])) {
                  const postFile = topicFolder[postKey][fileKey]
                  switch (postFile.type) {
                    case 'image':
                      img = blobTo(postFile)

                      break
                    case 'header':
                      header = blobTo(postFile)
                      starsCount = +postFile.starsCount
                      date = +postFile.date

                      break
                    case 'description':
                      description = blobTo(postFile)

                      break
                    case 'plus':
                      plus = blobTo(postFile)

                      break
                    case 'minus':
                      minus = blobTo(postFile)

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
              }
            })
          })
        })
      })
    })
  })
}
