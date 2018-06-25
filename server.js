`use strict`
// Dependencies
const express = require('express')
const cors = require('cors')
const pg = require('pg')
const app = express();


app.get('/', (req, res) => res.send('Hello World!'))
// Server 
app.listen(3000, () => console.log('Your server works dude!'))

