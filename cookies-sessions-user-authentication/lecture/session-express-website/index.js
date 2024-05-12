const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Setting EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Configuring session management
app.use(session({
    secret: 'yourSecretKey',  // Secret key for signing the session ID cookie
    resave: false,  // Do not save session if unmodified
    saveUninitialized: false,  // Do not create session until something stored
    cookie: { secure: false, maxAge: 60000 } // Cookie configuration, not secure as HTTPS is not used, and expires in 60000ms
}));


// Route to serve the login page via GET request
app.get('/login', (req, res) => {
    res.render('login');  // Renders the login page using EJS
});

// Route to handle the login logic via POST request
app.post('/login', (req, res) => {
    // Simulating user authentication
    const user = { _id: 1, name: 'John Doe' };  // Simulated user object for demonstration
    req.session.userId = user._id;  // Storing user ID in session
    req.session.isLoggedIn = true;  // Setting session logged in flag
    res.redirect('/dashboard');  // Redirecting to the dashboard after login
});

// Protected route for dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.isLoggedIn) {
        res.render('dashboard', { userId: req.session.userId });  // Render dashboard if logged in
    } else {
        res.redirect('/login');  // Redirect to login if not logged in
    }
});

// Route for logging out
app.get('/logout', (req, res) => {
    req.session.destroy(err => {  // Destroying the session
        if (err) {
            return res.redirect('/dashboard');  // If error, redirect back to dashboard
        }
        res.clearCookie('connect.sid');  // Clearing the session cookie
        res.redirect('/login');  // Redirecting to login page after logout
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
