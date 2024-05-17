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

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define the file schema and model
const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  mimetype: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);


// Configure Multer storage
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

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Serve the upload form
app.get('/upload', (req, res) => {
  res.render('upload');
});

// Handle file upload and save metadata to MongoDB
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
    await file.save();
    res.send('File uploaded and metadata saved successfully');
  } catch (err) {
    res.status(500).send('Error saving file metadata');
  }
});

// Create a route to display uploaded files
app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.render('view-files', { files: files });
  } catch (err) {
    res.status(500).send('Error retrieving files');
  }
});

// Handle file download
app.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send('File not found');
    }
    res.download(file.path, file.filename, (err) => {
      if (err) {
        res.status(500).send('Error downloading file');
      }
    });
  } catch (err) {
    res.status(500).send('Error retrieving file');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});