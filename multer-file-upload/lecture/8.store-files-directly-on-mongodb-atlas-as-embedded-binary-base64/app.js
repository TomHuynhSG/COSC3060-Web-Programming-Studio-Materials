// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const upload = require('./upload');
const Image = require('./database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

// Handle POST requests to the '/upload' endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
    // Create a new instance of the Image model with the uploaded file's details
    const img = new Image({
        // Store the name of the image from the form input
        name: req.body.name,
        // Store the image data as a buffer
        image: req.file.buffer,
        // Store the MIME type of the uploaded image
        contentType: req.file.mimetype,
    });

    // Save the image document to the database
    await img.save();

    // Redirect the user to the newly uploaded image's page using its MongoDB ID
    res.redirect(`/image/${img._id}`);
});


app.get('/image/:id', async (req, res) => {
    const image = await Image.findById(req.params.id);
    if (!image) {
        return res.status(404).send('Image not found');
    }
    // Convert image binary data to a base64 string
    const base64Image = image.image.toString('base64');

    res.render('image', { image, base64Image });
});

app.get('/image/data/:id', async (req, res) => {
    const image = await Image.findById(req.params.id);
    if (!image) {
        return res.status(404).send('Image not found');
    }
    res.contentType(image.contentType);
    res.send(image.image);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});