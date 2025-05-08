const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


const app = express();
const port = 3000;

// Middleware to parse request bodies
// support parsing of application/json type post data
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect('mongodb+srv://tom:mypassword@cluster0.fzbjkul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String  // Note: Never store passwords as plain text in production!
});

const User = mongoose.model('User', userSchema);

// Insert users
User.countDocuments({ username: 'admin' }).then((count) => {
  if (count > 0) {
    return;
  }
  new User({ username: 'admin', password: 'secret' }).save();
});
User.countDocuments({ username: 'john' }).then((count) => {
  if (count > 0) {
    return;
  }
  new User({ username: 'john', password: bcrypt.hashSync('nodejs', 10) }).save();
});

// Handle endpoints
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const { username, password, secured } = req.body;

  console.log({ username, password, secured });

  const handleError = (err) => {
    if (err) {
      console.error(err.message);
    }
    res.send('An error occurred.');
  };

  if (!!secured === true) {
    // Use Mongoose's built-in query language to prevent injection
    console.log("Secured Login:")
    User.findOne({ username })
      .then((user) => {
        
        if (user && bcrypt.compareSync(password, user.password)) {
          res.send(`Login success with user ${user.username} and pass ${user.password}.`);
        } else {
          res.send('Login failed');
        }
      })
      .catch((err) => handleError(err));
  } else {
    // This is insecure and added for educational purposes only
    // If you were to build a query using user input without sanitizing it, you could be vulnerable to injection
    console.log("Insecured Login:")
    User.findOne({ username, password })
      .then((user) => {
        if (user) {
          res.send(`Login success with user ${user.username} and pass ${user.password}.`);
        } else {
          res.send('Login failed');
        }
      })
      .catch((err) => handleError(err));
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = { User }; // Export User model
