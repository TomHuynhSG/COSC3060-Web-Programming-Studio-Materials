const fs = require('fs');

// Reading multiple files in sequence using callbacks
fs.readFile('file1.txt', 'utf8', (err, data1) => {
  if (err) throw err;
  console.log('Read file1:', data1);

  fs.readFile('file2.txt', 'utf8', (err, data2) => {
    if (err) throw err;
    console.log('Read file2:', data2);

    fs.readFile('file3.txt', 'utf8', (err, data3) => {
      if (err) throw err;
      console.log('Read file3:', data3);

      // Perform some operation using data from all three files
      console.log('Finished reading files.');
    });
  });
});