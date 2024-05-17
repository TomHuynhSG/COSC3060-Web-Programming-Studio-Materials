const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve the mixed file upload form
app.get('/upload-mixed', (req, res) => {
  res.send(`
    <form action="/upload-mixed" method="POST" enctype="multipart/form-data">
      <input type="file" name="profilePic" />
      <input type="file" name="gallery" multiple />
      <button type="submit">Upload</button>
    </form>
  `);
});

// Handle mixed file uploads
app.post('/upload-mixed', upload.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
]), (req, res) => {
  console.log(req.files); // Object containing arrays of file information
  res.send('Files uploaded successfully');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});