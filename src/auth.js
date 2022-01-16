export function authForm() {
  return `
	<div class="form-wrapper">
			<div class="mb-3 row">
			<label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
			<div class="col-sm-10">
				<input type="text" class="form-control-plaintext" id="staticEmail" value="email@example.com">
			</div>
		</div>
		<div class="mb-3 row">
			<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
			<div class="col-sm-10">
				<input type="password" class="form-control" id="inputPassword">
			</div>
		</div>
	</div>
	`
}
export function authWithEmailAndPass(email, password) {
  const apiKey = 'AIzaSyConfk-AACwT1JbcruOC6mLT5KS7W77P38'
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
