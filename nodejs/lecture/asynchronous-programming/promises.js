const fs = require('fs').promises;

fs.readFile('my_file.txt', 'utf8')
    .then(data => {
        console.log("File contents:", data);
    })
    .catch(err => {
        console.error("Error reading file:", err);
    });