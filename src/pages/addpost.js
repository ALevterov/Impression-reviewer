import firebase from 'firebase/compat/app'
import { getStorage, ref, uploadBytes, uploadString } from 'firebase/storage'
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
				<label for="select-area" class="form-label no-margin"
                >Выберите раздел:</label
              >
				<select class="form-select" id="select-area" aria-label="Default select example">
					<option value="1">Напитки</option>
					<option value="2">Еда</option>
					<option value="3">Подымить</option>
				</select>
				<label for="post-header" class="form-label no-margin"
                >Заголовок:</label
              >
              <input
                type="text"
                class="form-control"
                id="post-header"
								required
              />
						<label for="post-plus" class="form-label no-margin"
							>Плюсы:</label
						>
						<input
							type="text"
							class="form-control"
							id="post-plus"
							required
						/>
						<label for="post-minus" class="form-label no-margin"
							>Минусы:</label
						>
						<input
							type="text"
							class="form-control"
							id="post-minus"
							required
						/>
					<label for="formFile" class="form-label">Загрузить картинку:</label>
  			<input class="form-control" type="file" id="formFile" accept=".png, .jpg, .jpeg, .gif">
			  <div class="image-container"></div>
				<label for="textarea" class="form-label">Ваш отзыв о продукте:</label>
				<textarea class="form-control" id="textarea" rows="3"></textarea>
				<div class="star-container" id="star-container">
				<span>Общая оценка: <span>
				<i class="fas fa-star" id="1"></i>
				<i class="far fa-star" id="2"></i>
				<i class="far fa-star" id="3"></i>
				<i class="far fa-star" id="4"></i>
				<i class="far fa-star" id="5"></i>
				</div>	
				<button type="submit" class="btn btn-outline-success" id="create-post">Создать пост</button>
				</form>
				</div>				
		</div>
	`
  const topics = {
    1: 'drinkPosts',
    2: 'foodPosts',
    3: 'smokePosts',
  }
  mainBody.innerHTML = HTML
  const fileInput = mainBody.querySelector('#formFile')
  const textInput = mainBody.querySelector('#textarea')
  const subBtn = mainBody.querySelector('#create-post')
  const imageContainer = mainBody.querySelector('.image-container')
  const postHeader = mainBody.querySelector('#post-header')
  const plusInput = mainBody.querySelector('#post-plus')
  const minusInput = mainBody.querySelector('#post-minus')
  const selectArea = mainBody.querySelector('#select-area')

  let image, starsCount
  const stars = document.querySelectorAll('.fa-star')
  console.log(stars)
  stars.forEach((star) => {
    star.addEventListener('click', (event) => starClickHandler(event))
  })
  function starClickHandler(event) {
    const starContainer = document.getElementById('star-container')
    const id = +event.target.id
    starsCount = id || 1
    if (!id) return
    for (let i = 0; i < id; i++) {
      stars[i].classList.remove('far')
      stars[i].classList.add('fas')
    }
    for (let i = id; i < 5; i++) {
      stars[i].classList.remove('fas')
      stars[i].classList.add('far')
    }
  }

  function inputChangeHandler(event) {
    if (fileInput.files.length !== 0) image = fileInput.files[0]

    if (!image.type.match('image')) return

    const reader = new FileReader()

    reader.onload = (ev) => {
      const shownImage = ev.target.result
      const img = document.createElement('img')
      img.src = shownImage
      imageContainer.insertAdjacentElement('afterbegin', img)
    }
    reader.readAsDataURL(image)
  }
  function onUpload(
    image,
    description,
    header,
    plus,
    minus,
    starsCount,
    topicNumber
  ) {
    const topic = topics[topicNumber]
    console.log(topic)
    const folderName = `${topic}/${header}`
    const folderRef = ref(storage, folderName)
    const imageRef = ref(storage, `${folderName}/${image.name}`)
    const descriptionRef = ref(storage, `${folderName}/description`)
    const headerRef = ref(storage, `${folderName}/${header}`)
    const plusRef = ref(storage, `${folderName}/plus`)
    const minusRef = ref(storage, `${folderName}/minus`)
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
        starsCount: `${starsCount}`,
        date: `${Date.now()}`,
      },
    }
    const plusMetaData = {
      customMetadata: {
        type: 'plus',
        topic: `drinksPosts`,
        post: `${header}`,
        ref: `${plusRef}`,
      },
    }
    const minusMetaData = {
      customMetadata: {
        type: 'minus',
        topic: `drinksPosts`,
        post: `${header}`,
        ref: `${minusRef}`,
      },
    }
    const headerBytes = new TextEncoder().encode(header)
    const descriptionBytes = new TextEncoder().encode(description)
    const plusBytes = new TextEncoder().encode(plus)
    const minusBytes = new TextEncoder().encode(minus)
    uploadBytes(imageRef, image, imgMetaData)
    uploadBytes(descriptionRef, descriptionBytes, descriptionMetaData)
    uploadBytes(headerRef, headerBytes, headerMetaData)
    uploadBytes(plusRef, plusBytes, plusMetaData)
    uploadBytes(minusRef, minusBytes, minusMetaData)
  }
  fileInput.addEventListener('change', inputChangeHandler)
  function submitHandler() {
    const description = textInput.value
    const header = postHeader.value
    const plus = plusInput.value
    const minus = minusInput.value
    const topicNumber = selectArea.value
    onUpload(image, description, header, plus, minus, starsCount, topicNumber)
  }
  subBtn.addEventListener('click', (event) => {
    event.preventDefault()
    submitHandler()
  })
}
