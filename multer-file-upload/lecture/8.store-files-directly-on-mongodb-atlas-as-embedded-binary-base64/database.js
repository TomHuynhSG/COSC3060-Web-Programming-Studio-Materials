// database.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tomhuynh:mypassword@mydatabasecluster.xnarqwq.mongodb.net/file_upload?retryWrites=true&w=majority&appName=MyDatabaseCluster');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Define the schema for storing images in MongoDB
const imageSchema = new mongoose.Schema({
  // The name of the image, stored as a string
  name: String,
  // The image data itself, stored as a buffer (binary data)
  image: Buffer,
  // The content type of the image (e.g., 'image/jpeg', 'image/png'), stored as a string
  contentType: String,
});

// Create a model from the schema to interact with the images collection in MongoDB
const Image = mongoose.model('Image', imageSchema);


module.exports = Image;
