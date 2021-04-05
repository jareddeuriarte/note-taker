const express = require('express')
const app = express()
const PORT = 8080
const path = require('path')
const db = require('./db/db.json')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

//GET Request - landing page and note entry path - HTML ROUTES 
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/api/notes', (req, res) => {
  console.log("Api route");
  fs.readFile("./db/db.json", "utf8", (err, response) => {

    if (err) throw err;

    let existingNotes = JSON.parse(response);
    console.log(response); 
    res.json(existingNotes)
  });
})
//HTML REQUEST FOR THE GET 
app.get('/notes/', (req, res) => {
  
    console.log("HTML route");
  res.sendFile(path.join(__dirname, 'public/notes.html'))
  
});

//API POST REQUEST 
app.post('/notes', (req, res) => {
  let newNote = req.body;
  console.log("New note", newNote);
  newNote = {...req.body, "id": uuidv4()};
  fs.readFile("./db/db.json", "utf8", (err, response) => {

    if (err) throw err;

    let existingNotes = JSON.parse(response);
    console.log(response); 

    //apend newNote to exisiting data 
    existingNotes = [...existingNotes, newNote];
    console.log("combining two data", existingNotes)

    fs.writeFile('db/db.json', JSON.stringify(existingNotes), function (err) {
      if (err) return console.log(err);
      // res.json(newNote);
      console.log("Note created!", newNote);
    });

  }); //Closing Read  File 
})



app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})