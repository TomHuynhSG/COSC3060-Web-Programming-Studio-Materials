const express = require('express');
const app = express();

app.get('/set-cookie', (req, res) => {
    res.cookie('user', 'John Doe', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});