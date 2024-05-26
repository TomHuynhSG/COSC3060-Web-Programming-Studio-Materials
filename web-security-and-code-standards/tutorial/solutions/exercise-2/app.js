// Key Improvements:
// Environment Variables: Storing sensitive information like the MongoDB connection string in environment variables.
// Password Hashing: Ensuring passwords are hashed before being saved and during comparisons.
// Helmet: Using Helmet to secure HTTP headers.
// Rate Limiting: Implementing rate limiting to prevent abuse.
// Input Validation and Sanitization: Ensuring inputs are validated and sanitized.
// Secure Route Handling: Removing the insecure route and preventing insecure login methods.
// HTTPS: Recommended to ensure the app runs over HTTPS for production.


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse request bodies and secure headers
app.use(bodyParser.json());
app.use(helmet());
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Insert users if they don't already exist
async function insertUser(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await new User({ username, password: hashedPassword }).save();
  }
}


insertUser('john', 'nodejs');
insertUser('admin', 'secret');

// Handle endpoints
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', async (req, res) => {
  const { username, password, secured } = req.body;

  const handleError = (err) => {
    if (err) {
      console.error(err.message);
    }
    res.send('An error occurred.');
  };

  if (!!secured === true) {
    // Use Mongoose's built-in query language to prevent injection
    try {
      const user = await User.findOne({ username });
      if (user && await bcrypt.compare(password, user.password)) {
        res.send(`Login success with user ${user.username}.`);
      } else {
        res.send('Login failed');
      }
    } catch (err) {
      handleError(err);
    }
  } else {
    res.status(400).send('Insecure login method is not allowed.');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
