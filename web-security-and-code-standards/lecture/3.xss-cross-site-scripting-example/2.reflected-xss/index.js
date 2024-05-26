const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Render conditionally HTML
const renderHTML = (req) => `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Simple Reflected XSS Example</title>
  </head>
  <body>
      <h3>Reflected XSS Example</h3>
      <form action="/" method="post">
          <input type="text" name="comment" value="">
          <input type="submit">
      </form>
      ${req?.body.comment ? `<p>The comment was: ${req.body.comment}</p>
          <p>Have a look at the page source in the browser to see how the HTML tags in the input are rendered (i.e., they are not escaped properly)</p>
          <p>Try this one too: <code>&lt;strong&gt;hello&lt;/strong&gt;</code></p>
          <p>How do you fix this problem?</p>` : ''
  }
      <p>Enter the text below into the textbox and submit the form:</p>
      <pre><code>&lt;script&gt;alert("hello XSS");&lt;/script&gt;</code></pre>
  </body>
  </html>
`;

// Serve HTML page with the form
app.get('/', (req, res) => {
  res.send(renderHTML());
});

// Handle POST request
app.post('/', (req, res) => {
  res.send(renderHTML(req));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
