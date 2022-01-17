import {Post} from './post'
export function PostPage() {
  const mainBody = document.querySelector('.main__body')
  let HTML = `
		<div class="add-post__wrapper">
			<div class="add-post__container">
				<form>
					<label for="formFile" class="form-label">Загрузить картинку</label>
  			<input class="form-control" type="file" id="formFile" accept=".png, .jpg, .jpeg, .png, .gif">
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

  let files=[], text
  function inputChangeHandler(event) {
	if(fileInput.files.length !==0)
	files = Array.from(fileInput.files)

	files.forEach(file => {
	if(!file.type.match('image'))
		return
	
	const reader = new FileReader()

	reader.onload = ev => {
		const image = ev.target.result
		const img = document.createElement('img')
		img.src = image
		imageContainer.insertAdjacentElement('afterbegin', img)
	}
	reader.readAsDataURL(file)
}); 
  }
  fileInput.addEventListener('change', inputChangeHandler)
  function submitHandler() {
	if(textInput.value)
		text = textInput.value

	
  }
  subBtn.addEventListener('click', submitHandler)
}


