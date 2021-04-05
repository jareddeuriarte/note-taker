const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')
const db = require('./db/db.json')
const fs = require('fs')

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))





//GET Request - landing page and note entry path
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.post('/notes', (req, res) => {
    const newNote = req.body;

    newNote.routeName = newNote.text.replace(/\s+/g, '').toLowerCase();
    console.log(newNote);

    db.push(newNote);
    res.json(newNote);

    let data = 'newNote'

    fs.writeFile('db/db.json', data, function (err) {
        if (err) return console.log(err);
        console.log(data)
      });

})





app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
  })