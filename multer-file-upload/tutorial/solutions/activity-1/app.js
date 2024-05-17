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

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
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
      res.send('Error uploading file.');
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
