const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        const animeList = response.data.data;
        res.render('index', { animeList });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
