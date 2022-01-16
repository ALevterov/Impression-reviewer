export function setActiveNavLink(theme) {
  const navLinks = document.body.querySelectorAll('.nav-link')
  navLinks.forEach((link) => {
    link.classList.remove('active')
    if (link.parentNode.id === theme) {
      link.classList.add('active')
    }
  })
}
