const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB Atlas
const mongoDBUrl = 'mongodb+srv://tomhuynh:mypassword@mydatabasecluster.xnarqwq.mongodb.net/file_upload?retryWrites=true&w=majority&appName=MyDatabaseCluster';
mongoose.connect(mongoDBUrl).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Define the File schema
const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  mimetype: String
});

// Create the File model
const File = mongoose.model('File', fileSchema);

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype
    });
    await file.save();
    res.send('File uploaded successfully');
  } catch (err) {
    res.status(400).send('Error uploading file');
  }
});

// Create a route to display uploaded files
app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    res.status(500).send('Error retrieving files');
  }
});

// Create a route to serve uploaded files
app.get('/files/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send('File not found');
    }
    res.sendFile(file.path, { root: '.' });
  } catch (err) {
    res.status(500).send('Error retrieving file');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
