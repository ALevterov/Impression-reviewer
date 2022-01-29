export function clearForm(...elements) {
  elements.forEach((element) => {
    element.value = ''
  })
}
