export function createPostItem(img, header, description) {
  return `
	<div class="post">
				<div class="post-header">${header}</div>
				${img}
				<div class="post-text">
					${description}
				</div>
				<div class="about-author">

				</div>
			</div>
		</div>
	`
}
