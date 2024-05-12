const express = require('express');
const session = require('express-session');

const app = express();
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));


// Configure session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: null } // default to null, set during login
}));


function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        next(); // If a session exists, proceed to the next function in the middleware/route handler.
    } else {
        res.redirect('/login'); // If no session, redirect to login page.
    }
}


app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password, remember } = req.body;
    if (username === 'admin' && password === 'password') {
        // Set session user ID
        req.session.userId = username;

        // Extend session duration if "Remember Me" is checked
        if (remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
        } else {
            req.session.cookie.expires = false; // Browser-session length cookie
        }
        res.redirect('/profile');
    } else {
        res.send('Invalid credentials');
    }
});


app.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', { userId: req.session.userId });
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/login');
    });
});


app.listen(3000, () => console.log('App listening on port 3000'));
