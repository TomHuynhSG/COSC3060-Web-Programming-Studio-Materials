const fs = require('fs').promises; // Node.js has a built-in promisified version of the fs module

// Reading multiple files in sequence using Promises
fs.readFile('file1.txt', 'utf8')
  .then(data1 => {
    console.log('Read file1:', data1);
    return fs.readFile('file2.txt', 'utf8');  // Return the next promise
  })
  .then(data2 => {
    console.log('Read file2:', data2);
    return fs.readFile('file3.txt', 'utf8');  // Return the next promise
  })
  .then(data3 => {
    console.log('Read file3:', data3);
    console.log('Finished reading files.');
  })
  .catch(err => {
    console.error('An error occurred:', err);
  });