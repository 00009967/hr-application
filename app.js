const express = require('express');
const app = express();

app.set('view engine', 'pug')

app.use('/static', express.static('public'))

// Local host:8000
app.get('/home', (req, res) => {
    res.render('home')
});

// Login Page
app.get('/login', (req, res) => {
    res.render('login')
});

// Sign Up Page
app.get('/signup', (req, res) => {
    res.render('signup')
});

app.listen(8000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 8000!')
})