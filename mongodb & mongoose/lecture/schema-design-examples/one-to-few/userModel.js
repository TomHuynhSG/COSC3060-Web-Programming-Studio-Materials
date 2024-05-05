const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
    name: String,
    company: String,
    addresses: [{
        street: String,
        city: String,
        cc: String // cc stands for country code
    }]
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;