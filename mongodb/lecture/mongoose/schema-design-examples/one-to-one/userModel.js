// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: false
  },
  twitch: {
    type: String,
    required: false
  },
  tiktok: {
    type: String,
    required: false
  },
  website: {
    type: String,
    required: false
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;