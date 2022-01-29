import { showModal } from '../modal/showModal'
import { closeModal } from '../modal/closeModal'
import { authFormHandler } from '../essenses/auth'
import { createUserHandler } from '../essenses/registration'
import { signOutWrapper } from '../signIn&Up/signOutWrapper'
import { showMyProfile } from './showMyProfile'
import { fromSignInToSignUp } from '../signIn&Up/fromSignInToSignUp'
export let listeners = {
  signInBtn: (event) => showModal(event, signInModal),
  signInModal: (event) => closeModal(event, signInModal),
  signUpBtn: (event) => showModal(event, signUpModal),
  signUpModal: (event) => closeModal(event, signUpModal),
  enterBtn: (event) => authFormHandler(event, signInModal),
  createUserBtn: (event) => createUserHandler(event, signUpModal),
  signOutHandler: (event) => signOutWrapper(event),
  myProfile: (event) => showMyProfile(event),
  fromSignInToSignUp: (event) =>
    fromSignInToSignUp(event, toSignUpBtn, signUpModal),
}
