import { showModal } from './showModal'
import { closeModal } from './closeModal'
import { authFormHandler } from '../essenses/auth'
import { createUserHandler } from '../essenses/registration'
export let listeners = {
  signInBtn: (event) => showModal(event, signInModal),
  signInModal: (event) => closeModal(event, signInModal),
  signUpBtn: (event) => showModal(event, signUpModal),
  signUpModal: (event) => closeModal(event, signUpModal),
  enterBtn: (event) => authFormHandler(event, signInModal),
  createUserBtn: (event) => createUserHandler(event, signUpModal),
}
