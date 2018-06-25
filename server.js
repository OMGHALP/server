`use strict`;

// Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// App Setup
const app = express();
const PORT = process.env.PORT;

// Database


// Middleware
app.use(cors());


app.get('/', (req, res) => res.send('Hello World!'));
// Server Listen to Request
app.listen(PORT, () => console.log(`Your server works on ${PORT} dude!`));

