import { loadPostContent } from '../additional/loadfiles'
import { setActiveNavLink } from '../additional/setActiveLink'

export function renderPostsPage(event, topic) {
  let HTML = `
	<div class="drinks__posts__wrapper">
		<div class="drinks-container" id="post-container">
		<div class="loadingio-spinner-double-ring-sup9geo55m" id="loading-spinner"><div class="ldio-diitfi1lkuq">
			<div></div>
			<div></div>
			<div><div></div></div>
			<div><div></div></div>
			</div></div>
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
  loadPostContent(topic, postContainer)
}
