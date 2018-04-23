const express = require('express');

const app = express();

//initializes to a route that's / which is the homepage
app.get('/', (req, res) => {
    res.send('Hello! My name is Josh')
});

//process.env.port for Heroku
const PORT = process.env.PORT || 5000;

//run node server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});