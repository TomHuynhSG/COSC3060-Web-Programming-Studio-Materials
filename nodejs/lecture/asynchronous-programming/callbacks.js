const fs = require('fs');

fs.readFile('my_file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File contents:", data);
});