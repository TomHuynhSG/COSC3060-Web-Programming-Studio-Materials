const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser()); // Using cookie-parser middleware

app.get('/set-cookie', (req, res) => {
    res.cookie('user', 'John Doe', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set');
});

app.get('/get-cookie', (req, res) => {
    const userCookie = req.cookies.user; // Accessing the 'user' cookie
    if (userCookie) {
        res.send(`Cookie Value: ${userCookie}`);
    } else {
        res.send('Cookie not found');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('user'); // Deleting the 'user' cookie
    res.send('You have been logged out');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});