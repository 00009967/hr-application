const express = require('express');
const app = express();

const fs = require('fs')

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Local host:8000
app.get('/', (req, res) => {
    res.render('home')
})

// Login Page
app.get('/login', (req, res) => {
    res.render('login')
})

// Sign Up Page
app.get('/signup', (req, res) => {
    res.render('signup')
})

// All employee page
app.get('/allemployees', (req, res) => {
    
    
    fs.readFile('./data/hrDB.json', (err, data) => {
        if (err) throw err

        const people = JSON.parse(data)

        res.render('allempl', {people: people})
    })
})

app.get('/allemployees/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/hrDB.json', (err, data) => {
        if (err) throw err

        const people = JSON.parse(data)

        const person = people.filter(person => person.id == id)[0]

        res.render('detail', {person: person})


    })
})

// New employee page
app.get('/newemployee', (req, res) => {
    res.render('newempl')
});

app.post('/newemployee', (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const dob = req.body.dob
    const education = req.body.education
    const position = req.body.position

    if(name.trim() === '' && surname.trim() === '' && dob.trim() === '' && education.trim() === '' && position.trim() === ''){
        res.render('newempl', {error: true})
    } else {
        fs.readFile('./data/hrDB.json', (err, data) => {
            if(err) throw err

            const people = JSON.parse(data)

            people.push({
                id: id(),
                name: name,
                surname: surname,
                dob: dob,
                education: education,
                position: position
            })

            fs.writeFile('./data/hrDB.json', JSON.stringify(people), err => {
                if (err) throw err
                res.render('newempl', { success: true })
            })
        })
    }
});

app.listen(8000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 8000!')
})

function id(){
    return '_' + Math.random().toString(36).substr(2, 9);
}