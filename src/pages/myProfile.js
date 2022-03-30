import { postPage } from '../pages/addpost'
export function myProfile() {
  const mainBody = document.querySelector('.main__body')
  let HTML = `
	<div class="profile__wrapper">
		<div class="profile-container">
				<div class="profile-options">
					<div class="modal-content">
					<div class="modal-header">
						<div class="modal-header-center">Регистрация</div>
					</div>
					<div class="modal-body">
						<input
							type="email"
							class="form-control"
							id="email-input"
							placeholder="Email"
						/>
						<input
							type="email"
							class="form-control"
							id="username-input"
							placeholder="Username"
						/>
						<input
							type="password"
							class="form-control"
							id="password-input"
							placeholder="Password"
						/>
					</button>
					<button type="button" class="btn" id="createUserBtn">
						Зарегистрироваться
					</button>
					</div>
					<div class="modal-footer">
					</div>
				</div>
				<div class="profile-sidebar">
					<button
						type="button"
						class="btn btn-addpost"
						data-action="create"
						id="create"
						>
						Создать пост
					</button>
				</div>
			</div>
		</div>
	</div>
	`
  mainBody.innerHTML = HTML
  const createBtn = mainBody.querySelector('#create')
  createBtn.addEventListener('click', postPage)
}
