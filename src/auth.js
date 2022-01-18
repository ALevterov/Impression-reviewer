export function authWithEmailAndPass(email, password) {
  const apiKey = 'AIzaSyBd47pDOwXOBjmLwWclzincO3mpTpkSYGk'
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => data.idToken)
}
export function authFormHandler(event) {
  event.preventDefault()
  const emailInput = myModal.querySelector('#email-input')
  const passInput = myModal.querySelector('#password-input')

  const email = emailInput.value.trim()
  const password = passInput.value.trim()
  console.log(email, password)

  authWithEmailAndPass(email, password).then((token) => console.log(token))

  emailInput.value = ''
  passInput.value = ''
}
