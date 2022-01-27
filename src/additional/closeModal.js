export function closeModal(event, modal, forced = false) {
  let closable = false
  if (event) closable = event.target.dataset['closable']

  if (closable || forced) {
    modal.style.display = 'none'
    const inputs = modal.querySelectorAll('input')
    inputs.forEach((input) => {
      input.value = ''
    })
  }
}
