`use strict`;

// Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

//Ubuntu
const conString = `postgres://postgres:1234@localhost:5432/omghalpproject`

//Mac
// const conString = `postgres://localhost:5432/omghalp_app`

const client = new pg.Client(conString);
client.connect();
// client.on(`error`, err => {
//     console.error(err);
// });


// App Setup
const app = express();
const PORT = process.env.PORT;

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());

app.get('/problem', (req, res) => {
    let SQL = 'SELECT * FROM problem'
    
    client.query(SQL)
    .then(function (result) {
        res.send(result.rows);
        })
        .catch(function (err) {
          console.error(err);
        });
    });

app.post('/question', (req, res) => {

    let SQL = `INSERT INTO problem (question, tag, expectation, best_guess, code, result)
    VALUES($1, $2, $3, $4, $5, $6);
    `;

    let values = [
        req.body.question,
        req.body.tagz,
        req.body.expectation,
        req.body.best_guess,
        req.body.code,
        req.body.result
    ]

    client.query(SQL, values)
        .then(function () {
            console.log("made it to the .then of the get request")
            res.send('insert complete')
        })
        .catch(function (err) {
            console.error(err);
        });
})




// app.put('/solution')

// app.delete()


// Server Listen to Request
app.listen(PORT, () => console.log(`Your server works on ${PORT} dude!`));
