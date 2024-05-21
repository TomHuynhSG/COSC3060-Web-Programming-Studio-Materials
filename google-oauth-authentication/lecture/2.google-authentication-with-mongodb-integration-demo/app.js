// Load environment variables from a .env file into process.env
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('./config/mongoose');
const User = require('./models/User');


// Import the Passport library for authentication
const passport = require('passport');



// Require Passport configuration file (this should set up the strategies)
require('./config/passport-setup');

// Create an Express application
const app = express();

// Set EJS as the view engine for rendering templates
app.set('view engine', 'ejs');

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Session secret from environment variables
  resave: false, // Do not resave session if unmodified
  saveUninitialized: false // Do not create session until something is stored
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session()); // Use passport to manage sessions

// Define the home route
app.get('/', (req, res) => {
  res.render('index', { user: req.user }); // Render the 'index' view with user data
});

// Define the login route
app.get('/login', (req, res) => {
  res.render('login'); // Render the 'login' view
});

// Define the route for Google authentication
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'] // Request access to profile and email
  })
);

// Define the callback route for Google to redirect to after authentication
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), // Redirect to login on failure
  (req, res) => {
    // Successful authentication, redirect to the home page
    res.redirect('/');
  }
);

// Define the logout route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Handle logout error
    }
    res.redirect('/'); // Redirect to home after logout
  });
});

// Define the port number for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log the running port
});
