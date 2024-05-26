// Import the sanitize-html library
const sanitizeHtml = require('sanitize-html');

// Example of dirty HTML input
const dirtyHtml = `
  <div>
    <h1>Hello, World!</h1>
    <p>This is a paragraph with <a href="https://example.com" onclick="alert('Hack!')">a link</a>.</p>
    <img src="image.jpg" onerror="alert('Image error!')" />
    <span class="highlight" style="color:red;">Important text</span>
    <script>alert('This is a script!');</script>
  </div>
`;

// Sanitize the dirty HTML input
const cleanHtml = sanitizeHtml(dirtyHtml, {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'span']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    'span': ['class'],
    'img': ['src']
  },
});

// Log the sanitized HTML output
console.log('Original HTML:');
console.log(dirtyHtml);

console.log('Sanitized HTML using sanitize-html library:');
console.log(cleanHtml);
