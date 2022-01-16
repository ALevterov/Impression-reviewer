export class Post {
  static create(post) {
    fetch(
      'https://myfirstwebsite-4557d-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })
  }
}
