const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Set a cookie with an expiry of 48 hours
app.get('/', (req, res) => {
  res.cookie('serverSession', 'abcdef', {
    maxAge: 48 * 3600000, // 48 hours in milliseconds
    httpOnly: true // Makes the cookie inaccessible to client-side scripts, enhancing security
  });
  res.send('Cookie has been set!');
});

// Retrieve the value of the "serverSession" cookie
app.get('/get-cookie', (req, res) => {
  const serverSession = req.cookies.serverSession;
  if (serverSession) {
    res.send(`Cookie value: ${serverSession}`);
  } else {
    res.send('No serverSession cookie found');
  }
});

// Delete the "serverSession" cookie
app.get('/delete-cookie', (req, res) => {
  res.clearCookie('serverSession');
  res.send('Cookie serverSession has been deleted');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
