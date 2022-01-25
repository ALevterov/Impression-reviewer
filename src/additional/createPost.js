export function createPostItem(
  img,
  header,
  description,
  plus,
  minus,
  starsCount,
  date
) {
  let plusSvg = `
  	<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="12px" height="12px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/></svg>`

  let minusSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
	<svg
		 fill="#000000"
		 viewBox="0 0 50 50"
		 width="12px"
		 height="12px"
		 version="1.1">
		<defs
			 id="defs8" />
		<sodipodi:namedview
			 pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1252" inkscape:window-height="821" id="namedview6" showgrid="false" inkscape:zoom="17.2" inkscape:cx="25" inkscape:cy="25" inkscape:window-x="326" inkscape:window-y="121" inkscape:window-maximized="0" inkscape:current-layer="svg4" />
		<path
			 d="M 25,2 C 12.309295,2 2,12.309295 2,25 2,37.690705 12.309295,48 25,48 37.690705,48 48,37.690705 48,25 48,12.309295 37.690705,2 25,2 Z m 0,2 C 36.609824,4 46,13.390176 46,25 46,36.609824 36.609824,46 25,46 13.390176,46 4,36.609824 4,25 4,13.390176 13.390176,4 25,4 Z m -1,20 v 0 H 13 v 2 h 11 v 0 h 2 v 0 H 37 V 24 H 26 v 0 z"
			 id="path2"
			 sodipodi:nodetypes="ssssssssssccccccccccccc" />
	</svg>
	`
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  date = new Date(date).toLocaleString('ru', options).replace(',', '')
  function createStarString(starsCount) {
    let string = ``
    for (let i = 0; i < starsCount; i++) {
      string += '<i class="fas fa-star"></i>'
    }
    for (let i = starsCount; i < 5; i++) {
      string += '<i class="far fa-star"></i>'
    }
    return string
  }
  return `
	<div class="post">
				<h1 class="post-header">${header}</h1>
				<div class="post-date">${date}</div>
				<div class="post-stars">${createStarString(starsCount)}</div>
				<div class="post-plus">
				<p> ${plusSvg} Достоинства: <p>
				<p> ${plus}<p>
				</div>
				<div class="post-minus">
				<p> ${minusSvg} Недостатки <p>
				<p> ${minus}<p>
				</div>
				<div class="post-image">${img}</div>
				<div class="post-description">
					${description}
				</div>
				
			</div>
		</div>
	`
}
