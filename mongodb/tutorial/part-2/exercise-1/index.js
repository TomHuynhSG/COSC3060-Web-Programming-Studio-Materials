const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.set('view engine', 'ejs');

// change your mongodb url here
mongoose.connect('mongodb+srv://tomhuynh:mypassword@cluster0.coimmkg.mongodb.net/shopDB?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.log(error.message));

// Define a schema
const productSchema = new mongoose.Schema({
  // Fill in your code here


});

// Define a model based on the schema


// Use the `express.urlencoded` middleware to parse incoming form data

// Show the homepage
app.get('/', (req, res) => {
  res.render('index');
});


// CREATE - Show create product form


// CREATE - Create a new product


// READ - Get all products


// UPDATE - Show update product form



// UPDATE - Update a product by ID


// DELETE - Show delete product form


// DELETE - Delete a product by ID
