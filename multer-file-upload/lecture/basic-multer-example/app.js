const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage'); // Name of the file input field

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set up public directories
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to upload page
app.get('/', (req, res) => {
  res.render('index', {
    message: null,
    file: null
  });
});

// Handle file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        message: err,
        file: null
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          message: 'No file selected!',
          file: null
        });
      } else {
        res.render('index', {
          message: 'File uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
