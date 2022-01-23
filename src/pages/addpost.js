import firebase from 'firebase/compat/app'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
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

export function PostPage() {
  const mainBody = document.querySelector('.main__body')
  let HTML = `
		<div class="add-post__wrapper">
			<div class="add-post__container">
				<form>
				<label for="post-header" class="form-label no-margin"
                >Заголовок:</label
              >
              <input
                type="text"
                class="form-control"
                id="post-header"
                placeholder="Заголовок поста"
								required
              />
					<label for="formFile" class="form-label">Загрузить картинку</label>
  			<input class="form-control" type="file" id="formFile" accept=".png, .jpg, .jpeg, .gif">
			  <div class="image-container"></div>
				<label for="textarea" class="form-label">Ваш отзыв о продукте</label>
				<textarea class="form-control" id="textarea" rows="3"></textarea>
					<button type="submit" class="btn btn-outline-success" id="create-post">Создать пост<button>
				</form>
			</div>
		</div>
	`
  mainBody.innerHTML = HTML

  const fileInput = mainBody.querySelector('#formFile')
  const textInput = mainBody.querySelector('#textarea')
  const subBtn = mainBody.querySelector('#create-post')
  const imageContainer = mainBody.querySelector('.image-container')
  const postHeader = mainBody.querySelector('#post-header')

  let files = []
  function inputChangeHandler(event) {
    if (fileInput.files.length !== 0) files = Array.from(fileInput.files)

    files.forEach((file) => {
      if (!file.type.match('image')) return

      const reader = new FileReader()

      reader.onload = (ev) => {
        const image = ev.target.result
        const img = document.createElement('img')
        img.src = image
        imageContainer.insertAdjacentElement('afterbegin', img)
      }
      reader.readAsDataURL(file)
    })
  }
  function onUpload(image, description, header) {
    const folderName = `drinkPosts/${header}`
    const folderRef = ref(storage, folderName)
    const imageRef = ref(storage, `${folderName}/${image.name}`)
    const descriptionRef = ref(storage, `${folderName}/description`)
    const headerRef = ref(storage, `${folderName}/${header}`)
    const imgMetaData = {
      customMetadata: {
        topic: `drinksPosts`,
        type: 'image',
        post: `${header}`,
        ref: `${imageRef}`,
      },
    }
    const descriptionMetaData = {
      customMetadata: {
        type: 'description',
        topic: `drinksPosts`,
        post: `${header}`,
        ref: `${descriptionRef}`,
      },
    }
    const headerMetaData = {
      customMetadata: {
        type: 'header',
        topic: `drinksPosts`,
        post: `${header}`,
        ref: `${headerRef}`,
      },
    }
    uploadBytes(imageRef, image, imgMetaData).then((snapshot) => {
      console.log(snapshot)
    })
    uploadBytes(descriptionRef, description, descriptionMetaData).then(
      (snapshot) => {
        console.log(snapshot)
      }
    )
    uploadBytes(headerRef, header, headerMetaData).then((snapshot) => {
      console.log(snapshot)
    })
  }
  fileInput.addEventListener('change', inputChangeHandler)
  function submitHandler() {
    const description = textInput.value
    const header = postHeader.value
    onUpload(files[0], description, header)
  }
  subBtn.addEventListener('click', submitHandler)
}
