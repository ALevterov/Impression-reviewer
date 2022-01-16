export function PostPage() {
  const mainBody = document.querySelector('.main__body')
  let HTML = `
		<div class="add-post__wrapper">
			<div class="add-post__container">
				<form>
					<label for="formFile" class="form-label">Загрузить картинку</label>
  			<input class="form-control" type="file" id="formFile" accept=".png, .jpg, .jpeg, .png, .gif">
				<label for="exampleFormControlTextarea1" class="form-label">Ваш отзыв о продукте</label>
				<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
					<button type="submit" class="btn btn-outline-success" id="create-post">Создать пост<button>
				</form>
			</div>
		</div>
	`
  mainBody.innerHTML = HTML
}
