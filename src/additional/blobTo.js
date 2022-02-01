export function blobTo(uint8array, type) {
  const options = {
    image: blobToImage,
    header: blobToString,
    description: blobToString,
    plus: blobToString,
    minus: blobToString,
  }
  function blobToImage() {
    const src = URL.createObjectURL(
      new Blob([uint8array], {
        type: 'image/png',
      })
    )
    return `<img src="${src}">`
  }
  function blobToString() {
    return new TextDecoder('utf-8').decode(uint8array)
  }

  return options[type]()
}
