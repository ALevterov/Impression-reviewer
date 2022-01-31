import firebase from 'firebase/compat/app'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { clearForm } from '../additional/clearForm'
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

export function postPage() {
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
						<textarea
							class="form-control form-plus"
							id="post-plus"
						></textarea>
						<label for="post-minus" class="form-label no-margin"
							>Минусы:</label
						>
						<textarea
							class="form-control form-minus"
							id="post-minus"
						></textarea>
					<label for="formFile" class="form-label">Загрузить картинку:</label>
  			<input class="form-control" type="file" id="formFile" accept=".png, .jpg, .jpeg, .gif">
			  <div class="image-container"></div>
				<label for="textarea" class="form-label">Ваш отзыв о продукте:</label>
				<textarea class="form-control form-description" id="textarea" rows="3"></textarea>
				<div class="star-container" id="star-container">
				<span>Общая оценка: <span>
				<i class="far fa-star" id="1"></i>
				<i class="far fa-star" id="2"></i>
				<i class="far fa-star" id="3"></i>
				<i class="far fa-star" id="4"></i>
				<i class="far fa-star" id="5"></i>
				</div>	
				<button type="submit" class="btn btn-create-post" id="create-post">Создать пост</button>
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
    star.addEventListener('click', (event) =>
      starClickHandler(+event.target.id)
    )
  })
  function starClickHandler(id) {
    const starContainer = document.getElementById('star-container')
    starsCount = id || 1
    if (!id && id !== 0) return
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
      img.classList.add('form-image')
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
    const fileInput = mainBody.querySelector('#formFile')
    const textInput = mainBody.querySelector('#textarea')
    const subBtn = mainBody.querySelector('#create-post')
    const imageContainer = mainBody.querySelector('.image-container')
    const postHeader = mainBody.querySelector('#post-header')
    const plusInput = mainBody.querySelector('#post-plus')
    const minusInput = mainBody.querySelector('#post-minus')
    const selectArea = mainBody.querySelector('#select-area')
    clearForm(
      fileInput,
      textInput,
      postHeader,
      plusInput,
      minusInput,
      selectArea
    )
    const deletedImage = imageContainer.childNodes[0]
    deletedImage.parentNode.removeChild(deletedImage)
    starClickHandler(0)
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
