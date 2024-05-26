const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Middleware
app.use(express.json());

app.use(function(req, res, next) {
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id, (err, user) => { // no-undef: 'User' is not defined
    if (err) res.status(500).send('Something went wrong!'); // callback without proper error handling
    res.send(user);
  });
});

app.post('/user', (req, res) => {
  const user = new User(req.body); // no-undef: 'User' is not defined
  user.save((err) => {
    if (err) return res.status(500).send('Something went wrong!');
    res.send('User created');
  });
});

// Unused variable
const unusedVariable = 123; // no-unused-vars: 'unusedVariable' is assigned a value but never used

// Function with unused parameters
function unusedParams(param1, param2) { // no-unused-vars: 'param1' and 'param2' are defined but never used
  return;
}

// Database connection without proper error handling
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Inconsistent return statement
function inconsistentReturn(value) {
  if (value) {
    return value;
  } else {
    // No return here, causing inconsistent return behavior
  }
}

// No newline at the end of the file
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
missingFunction(); // no-undef: 'missingFunction' is not defined
