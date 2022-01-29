import { showModal } from '../modal/showModal'
export function fromSignInToSignUp(event, closeBtn, modal) {
  event.preventDefault()
  closeBtn.click()
  showModal(event, modal)
}
