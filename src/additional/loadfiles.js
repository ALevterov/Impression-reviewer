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

export function loadPostContent(section) {
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
                let postHTML
                let img = ``
                for (let fileKey of Object.keys(topicFolder[postKey])) {
                  const postFile = topicFolder[postKey][fileKey]
                  if (postFile.type === 'image') {
                    console.log('image!')
                    URL.createObjectURL(
                      new Blob([postFile.file.buffer], { type: 'image/png' })
                    )
                    // img = `<img src="${}">`
                  }
                }
              }
            })
          })
        })
      })
    })
  })
}
