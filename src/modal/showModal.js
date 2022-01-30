export function showModal(event, modal) {
  event.preventDefault()
  const container = document.getElementById('post-container')
  if (container) {
    console.log(container)
    modal.style.height = container.clientHeight + 140 + 'px'
  }
  // modal.style.height = window.screen.height + 'px'
  modal.style.display = 'block'
}
