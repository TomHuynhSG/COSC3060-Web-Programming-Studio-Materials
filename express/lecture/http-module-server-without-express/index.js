// Load HTTP module
const http = require('http');

// The hostname and port where our server will reside
const hostname = '127.0.0.1';
const port = 3000;

// Create HTTP server 
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

// The server listens to port 3000
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});