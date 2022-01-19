export class User {
  static create() {}

  static fetch(token) {
    return this.fetch('')
      .then((response) => response.json())
      .then((data) => console.log(data))
  }
}
