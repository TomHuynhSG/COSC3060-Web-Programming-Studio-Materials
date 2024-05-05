const mongoose = require('mongoose');

// Define the schema for log messages
const logMessageSchema = new mongoose.Schema({
    time: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host'
    }
});

// Export the LogMessage model
module.exports = mongoose.model('LogMessage', logMessageSchema);