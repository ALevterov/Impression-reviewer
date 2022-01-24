export function blobTo(File) {
  let uint8array = File.file.value
  const options = {
    image: blobToImage,
    header: blobToString,
    description: blobToString,
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

  return options[File.type]()
}
