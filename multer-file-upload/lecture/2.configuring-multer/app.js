const express = require('express');
const multer = require('multer');
const app = express();


// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'custom_uploads/'); // Custom directory for file uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Serve the upload form
app.get('/upload', (req, res) => {
  res.send(`
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="profilePic" />
        <button type="submit">Upload</button>
      </form>
    `);
});

// Handle file upload
app.post('/upload', upload.single('profilePic'), (req, res) => {
  res.send('File uploaded successfully');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});