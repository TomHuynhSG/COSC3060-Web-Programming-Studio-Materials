function handleSubmit(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const secured = document.querySelector('#secured').checked;

  console.log({ username, password, secured })

  // Post the data
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, secured }),
  })
    .then(response => response.text())
    .then(data => alert(data))
    .catch((error) => {
      console.error('Error:', error);
    });
}

const form = document.forms[0];
form.addEventListener('submit', handleSubmit);