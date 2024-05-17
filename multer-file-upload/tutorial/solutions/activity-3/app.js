// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const port = 3000;

// Connect to MongoDB Atlas
const mongoDBUrl = 'mongodb+srv://tomhuynh:mypassword@mydatabasecluster.xnarqwq.mongodb.net/file_upload?retryWrites=true&w=majority&appName=MyDatabaseCluster';
mongoose.connect(mongoDBUrl).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});


// Define Schema
const fileSchema = new mongoose.Schema({
  filename: String,
  filetype: String,
  uploadDate: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // 2MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('file');

// EJS
app.set('view engine', 'ejs');

// Public folder
app.use(express.static('./public'));

// Route
app.get('/', (req, res) => res.render('index'));

app.post('/upload', async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.send(err);
    } else {
      if (req.file == undefined) {
        res.send('No file selected.');
      } else {
        try {
          const newFile = new File({
            filename: req.file.filename,
            filetype: req.file.mimetype,
            uploadDate: new Date()
          });

          await newFile.save();
          res.send('File uploaded and metadata saved successfully.');
        } catch (err) {
          res.send('Error saving file metadata.');
        }
      }
    }
  });
});

app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.render('files', { files });
  } catch (err) {
    res.send('Error retrieving files.');
  }
});

app.get('/download/:filename', (req, res) => {
  const file = `./uploads/${req.params.filename}`;
  res.download(file);
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));