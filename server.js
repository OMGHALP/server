`use strict`;

// Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

//Ubuntu
const conString = `postgres://travis:1234@localhost:5432/omghalpproject`

//Mac
// const conString = `postgres://localhost:5432/omghalp_app`

// Deployed
// const conString = `postgres://iidlcfkfxqvklw:e2ade26e5c65ace8fe054a0e07aa55738148db89c5ecfce414b68df170d51f21@ec2-54-235-70-127.compute-1.amazonaws.com:5432/dc56a5usjoofc0`

//  const client = new pg.Client(process.env.DATABASE_URL);

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
    .then((result) => {
        res.send(result.rows);
        })
        .catch((err) => {
          console.error(err);
        });
    });

app.post('/question', (req, res) => {

    let SQL = `INSERT INTO problem (question, tag, expectation, best_guess, codes, result)
    VALUES($1, $2, $3, $4, $5, $6);
    `;
    console.log(req.body.codes)

    let values = [
        req.body.question,
        req.body.tagz,
        req.body.expectation,
        req.body.best_guess,
        req.body.codes,
        req.body.result
    ]

    client.query(SQL, values)
        .then( () => {
            res.send('insert complete')
        })
        .catch( (err) => {
            console.error(err);
        });
})

app.put('/solution', (req, res) => {

    let SQL = `UPDATE problem SET question=$1, tag=$2, expectation=$3, best_guess=$4, result=$5, solution=$6, codes=$7 WHERE problem_id=$8;`;
    let values = [
        req.body.question,
        req.body.tag,
        req.body.expectation,
        req.body.best_guess,
        req.body.result,
        req.body.solution,
        req.body.codes,
        req.body.problem_id
    ];

    console.log(values);
    client.query(SQL, values)
        .then(()=> {
            res.send('update complete')
        })
        .catch((err) => {
            console.error(err);
        });
})


// Server Listen to Request
app.listen(PORT, () => console.log(`Your server works on ${PORT} dude!`));