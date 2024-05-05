const mongoose = require('mongoose');

// Define the schema for a host
const hostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ipaddr: {
        type: String,
        required: true
    }
});

// Export the Host model
module.exports = mongoose.model('Host', hostSchema);