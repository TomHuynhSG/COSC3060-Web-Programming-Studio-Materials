// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

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

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.send('Error: File size too large!');
      } else {
        res.send(err);
      }
    } else {
      if (req.file == undefined) {
        res.send('No file selected.');
      } else {
        res.send('File uploaded successfully.');
      }
    }
  });
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
