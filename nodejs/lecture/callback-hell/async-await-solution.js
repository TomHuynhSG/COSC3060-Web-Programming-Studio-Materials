const fs = require('fs').promises; // Node.js has a built-in promisified version of the fs module

async function readFiles() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    console.log('Read file1:', data1);

    const data2 = await fs.readFile('file2.txt', 'utf8');
    console.log('Read file2:', data2);

    const data3 = await fs.readFile('file3.txt', 'utf8');
    console.log('Read file3:', data3);

    console.log('Finished reading files.');
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

readFiles();