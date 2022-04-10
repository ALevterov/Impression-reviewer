import {
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth'

import { postPage } from '../pages/addpost'
export function myProfile() {
  const mainBody = document.querySelector('.main__body')
  const auth = getAuth()
  const user = auth.currentUser
  let { email, displayName } = user
  let HTML = `
	<div class="profile__wrapper">
      <div class="profile-container">
        <div class="user-settings">
          <div class="profile-user-item">
            <div class="toggle-target">
              Email:  ${email}
              <i class="fas fa-chevron-down" id="arrow"></i>
            </div>
            <div class="change-pass hidden" id="change-pass-toggle">
              <form>
                <input
                  type="text"
                  class="form-control"
                  id="new-email"
                  placeholder="Введите новый email"
                  required
                />
                <button
                  type="submit"
                  class="btn btn-create-post"
									id="btn-change-email"
                >
                  Изменить Email
                </button>
              </form>
            </div>
          </div>
          <div class="profile-user-item">
            <div class="toggle-target">
              Имя пользователя: ${displayName || 'не задано'}
              <i class="fas fa-chevron-down" id="arrow"></i>
            </div>
            <div class="change-pass hidden" id="change-pass-toggle">
              <form>
                <input
                  type="text"
                  class="form-control"
                  id="new-username"
                  placeholder="Введите новое имя пользователя"
                  required
                />
                <button
                  type="submit"
                  class="btn btn-create-post"
									id="btn-change-username"
                >
                  Изменить Имя
                </button>
              </form>
            </div>
          </div>
          <div class="profile-user-item pass">
            <div class="toggle-target">
              Поменять пароль: <i class="fas fa-chevron-down" id="arrow"></i>
            </div>
            <div class="change-pass hidden" id="change-pass-toggle">
              <form>
                <input
                  type="password"
                  class="form-control"
                  id="old-pass"
                  placeholder="Введите старый пароль"
                  required
                />
                <input
                  type="password"
                  class="form-control"
                  id="new-pass"
                  placeholder="Введите новый пароль"
                  required
                />
                <input
                  type="password"
                  class="form-control"
                  id="retype-new-pass"
                  placeholder="Повторите новый пароль"
                  required
                />
                <button
                  type="submit"
                  class="btn btn-create-post"
                  id="btn-change-pass"
                  disabled
                >
                  Изменить пароль
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="user-posts">
          <button
            type="button"
            class="btn btn-modal"
            data-action="create"
            id="create"
          >
            Создать пост
          </button>
        </div>
      </div>
    </div>
	`
  mainBody.innerHTML = HTML

  const toggleTargets = document.querySelectorAll('.toggle-target')

  const oldPass = document.getElementById('old-pass')

  const newPass = document.getElementById('new-pass')

  const retypeNewPass = document.getElementById('retype-new-pass')

  const btnChangePass = document.getElementById('btn-change-pass')

  const btnChangeEmail = document.getElementById('btn-change-email')

  const btnChangeUsername = document.getElementById('btn-change-username')

  const toggleHandler = (event) => {
    console.log(event.target)
    let targetNode = event.target
    if (event.target.nodeName === 'I') {
      targetNode = targetNode.parentNode
    }
    console.log(targetNode)
    const arrow = targetNode.querySelector('#arrow')
    const toggled = targetNode.nextElementSibling
    toggled.classList.toggle('hidden')
    if (arrow.classList.contains('fa-chevron-down')) {
      arrow.classList.remove('fa-chevron-down')
      arrow.classList.add('fa-chevron-up')
    } else {
      arrow.classList.add('fa-chevron-down')
      arrow.classList.remove('fa-chevron-up')
    }
  }

  const dblclickHandler = (event) => {
    event.preventDefault()
  }
  toggleTargets.forEach((TT) => {
    TT.addEventListener('click', toggleHandler)
    TT.firstChild.addEventListener('dblclick', dblclickHandler)
  })

  const changeInputHandler = () => {
    if (
      newPass.value.trim().length < 6 ||
      newPass.value !== retypeNewPass.value
    ) {
      btnChangePass.disabled = true
    } else {
      btnChangePass.disabled = false
    }
  }
  const clearInputs = (...args) => {
    args.forEach((arg) => {
      arg.value = ''
    })
  }
  const btnChangePassHandler = (event) => {
    event.preventDefault()
    const pass = oldPass.value.trim()
    signInWithEmailAndPassword(auth, email, pass)
      .then((data) => {
        updatePassword(user, newPass.value.trim())
          .then(() => {
            console.log('Пароль успешно изменён')
            clearInputs(oldPass, newPass, retypeNewPass)
          })
          .catch(() => {
            console.log('Что то пошло не так')
            clearInputs(oldPass, newPass, retypeNewPass)
          })
      })
      .catch((error) => {
        console.log('Неверный пароль!')
        clearInputs(oldPass, newPass, retypeNewPass)
      })
  }

  const btnChangeEmailHandler = (event) => {
    event.preventDefault()
    const newEmail = document.getElementById('new-email')
    console.log('new email is ', newEmail.value.trim())
    updateEmail(auth.currentUser, newEmail.value.trim())
      .then(() => {
        console.log('email updated!')
        newEmail.value = ''
      })
      .catch((e) => {
        newEmail.value = ''
        console.log('fucken email update error!', e)
      })
  }

  const btnChangeUsernameHandler = (event) => {
    event.preventDefault()
    const newUserName = document.getElementById('new-username')
    updateProfile(auth.currentUser, {
      displayName: newUserName.value.trim(),
    })
      .then(() => {
        console.log('UserName updated!')
        newUserName.value = ''
      })
      .catch((e) => {
        newUserName.value = ''
        console.log('fucken UserName update error!', e)
      })
  }

  newPass.addEventListener('input', changeInputHandler)
  retypeNewPass.addEventListener('input', changeInputHandler)

  btnChangePass.addEventListener('click', btnChangePassHandler)
  btnChangeEmail.addEventListener('click', btnChangeEmailHandler)
  btnChangeUsername.addEventListener('click', btnChangeUsernameHandler)

  const createBtn = mainBody.querySelector('#create')
  createBtn.addEventListener('click', postPage)
}
