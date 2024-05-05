// taskModel.js
const mongoose = require('mongoose');
const User = require('./userModel'); // Import User model to ensure reference integrity

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;