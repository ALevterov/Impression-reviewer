import { loadPostContent } from '../additional/loadfilesNew'
import { setActiveNavLink } from '../additional/setActiveLink'

export function drinksPageHandler(event) {
  let clientheight = window.innerHeight
  const drinkPosts = ''
  let HTML = `
	<div class="drinks__posts__wrapper">
		<div class="drinks-container" id="post-container">
		</div>
	</div>
	`
  const mainBody = document.querySelector('.main__body')
  mainBody.innerHTML = HTML
  if (event.target.id) {
    setActiveNavLink(event.target.id)
  } else {
    setActiveNavLink(event.target.parentNode.id)
  }

  const postContainer = mainBody.querySelector('#post-container')
  loadPostContent('drinkPosts', postContainer)
}
