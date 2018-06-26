`use strict`;

// Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');


// Constring 
// const conStringTrav = `postgres://postgres:1234@localhost:5432/`
const conString = `postgres://localhost:5432/omghalp_app`
const client = new pg.Client(conString);
client.connect();
client.on(`error`, err => {
    console.error(err);
});




// App Setup
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Middleware
app.use(cors());


app.get('/problems', (req, res) => res.send('Hello World!'));

app.post('/question')
app.put('/solution')

app.delete()
// Server Listen to Request
app.listen(PORT, () => console.log(`Your server works on ${PORT} dude!`));

