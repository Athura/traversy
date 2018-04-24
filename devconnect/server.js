const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body Parser middleware
// allows us to access req.body.___
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB and display errors
mongoose
    .connect(db)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => {
        console.log(err)
    });

//initializes to a route that's / which is the homepage
app.get('/', (req, res) => {
    res.send('Hello! My name is Josh')
});

// Passport middleware
app.use(passport.initialize());

// Passport config 
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//process.env.port for Heroku
const PORT = process.env.PORT || 5000;

//run node server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});