const fs = require('fs').promises;

async function readFile() {
    try {
        const data = await fs.readFile('my_file.txt', 'utf8');
        console.log("File contents:", data);
    } catch (err) {
        console.error("Error reading file:", err);
    }
}

readFile();