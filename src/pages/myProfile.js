import { postPage } from '../pages/addpost'
export function myProfile() {
  const mainBody = document.querySelector('.main__body')
  let HTML = `
	<div class="profile__wrapper">
		<div class="profile-container">
		<button
		type="button"
		class="btn btn-addpost"
		data-action="create"
		id="create"
		>
			Добавить пост
		</button>
		</div>
	</div>
	`
  mainBody.innerHTML = HTML
  const createBtn = mainBody.querySelector('#create')
  createBtn.addEventListener('click', postPage)
}
