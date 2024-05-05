// productModel.js
const mongoose = require('mongoose');
const Part = require('./partModel'); // Import the Part model for reference

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    catalog_number: {
        type: String,
        required: true
    },
    parts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Part'
    }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;