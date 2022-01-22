import { Post } from '../essenses/post'
import { PostPage } from './addpost'
import { loadPostContent } from '../additional/loadfiles'
import { setActiveNavLink } from '../additional/setActiveLink'
export function drinksPageHandler(event) {
  let clientheight = window.innerHeight
  const drinkPosts = ''
  let HTML = `
	<div class="drinks__posts__wrapper">
		<div class="drinks-container" id="post-container">
			<div class="post">
				<img src="">
				<div class="post-text">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis voluptatibus recusandae dolore facilis officiis ex eaque modi suscipit, sequi nesciunt, possimus praesentium nihil. Repellendus reiciendis blanditiis praesentium voluptatem quidem quod, placeat quo recusandae quis dolorem sunt temporibus sequi excepturi mollitia est voluptatum ducimus quas, similique doloribus nobis commodi dolore at qui dicta! Vel, iusto veritatis magnam consequatur autem reprehenderit, asperiores quaerat deserunt adipisci, facilis dignissimos cumque tempore harum ratione rem blanditiis impedit ad pariatur nemo. Sit nostrum corporis magni a aperiam mollitia, maiores laboriosam alias quo praesentium, beatae saepe molestiae debitis cumque quam unde officia sapiente, nisi adipisci tenetur fugiat illo totam! Hic molestiae officiis similique obcaecati. Maxime beatae iste obcaecati repellendus dolore odit expedita veritatis temporibus dolorum, officiis quisquam aspernatur voluptates qui animi consequuntur inventore delectus, accusantium ipsum voluptatem? At sapiente tempora corrupti saepe eum deleniti laboriosam rerum et placeat, nemo, voluptate eaque cum iusto architecto ullam reiciendis eius.
				</div>
				<div class="about-author">

				</div>
			</div>
		</div>
		<aside class="right-sidebar" style="height: ${clientheight}px">
		<div class="add-post">
			<span>Здесь вы можете добавить новый пост</span>
		<button
		type="button"
		class="btn btn-success"
		data-action="create"
		id="create"
	>
		Добавить пост
	</button>
		</div>
		
		</aside>
	</div>
	`
  const mainBody = document.querySelector('.main__body')
  mainBody.innerHTML = HTML
  const createBtn = mainBody.querySelector('#create')
  createBtn.addEventListener('click', PostPage)
  if (event.target.id) {
    setActiveNavLink(event.target.id)
  } else {
    setActiveNavLink(event.target.parentNode.id)
  }
  function showContent(selector) {
    const container = document.getElementById(`${selector}`)
    // console.log(container)
    const newPost = document.createElement('div')
    newPost.classList.add('post')
    // console.log(newPost)
    newPost.innerHTML = `
		<div class="post-header>${newPostFiles[0]}</div>
		<img src="${newPostFiles[1]}">
		<div class="post-text">
			${newPostFiles[2]}
		</div>
		<div class="about-author">

		</div>
		`
    container.appendChild(newPost)
  }
  let fileContainer = []
  async function matUmerla() {
    await loadPostContent('drinkPosts', 'new cool post', fileContainer)
  }
  matUmerla()

  // loadPostContent('drinkPosts', 'new cool post', fileContainer)
  const postContainer = mainBody.querySelector('#post-container')
  console.log('fileContainer:', fileContainer)
}
