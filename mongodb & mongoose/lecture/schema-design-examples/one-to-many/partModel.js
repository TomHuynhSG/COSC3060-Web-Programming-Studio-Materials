// partModel.js
const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    partno: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Part = mongoose.model('Part', partSchema);

module.exports = Part;