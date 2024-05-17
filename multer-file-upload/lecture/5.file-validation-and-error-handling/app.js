const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination directory for uploaded files
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Create a unique filename using the current timestamp and a random number
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Define file filter to only accept JPEG and PNG files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false); // Reject file
  }
};

// Configure multer with storage options and file filter
const upload = multer({
  storage: storage,
  // limits: { fileSize: 1024 * 1024 * 5 }, // Set file size limit to 5MB (commented out for demonstration)
  fileFilter: fileFilter
});

// Serve the HTML upload form
app.get('/', (req, res) => {
  res.render('upload');
});

// Handle file upload
app.post('/upload', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      return res.status(400).send(err.message);
    } else if (err) {
      // Handle custom errors
      return res.status(400).send(err.message);
    }
    // Send success response if file is uploaded successfully
    res.send('File uploaded successfully');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
