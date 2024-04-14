const fs = require('fs');

// Reading file1 independently
fs.readFile('file1-big-file.txt', 'utf8', (err, data1) => {
  if (err) throw err;
  console.log('Done Reading file1 (Big File)!');
});

// Reading file2 independently
fs.readFile('file2.txt', 'utf8', (err, data2) => {
  if (err) throw err;
  console.log('Done Reading file2!');
});

// Reading file3 independently
fs.readFile('file3.txt', 'utf8', (err, data3) => {
  if (err) throw err;
  console.log('Done Reading file3!');
});

console.log('Started reading files.'); // Indicates that file reading has started