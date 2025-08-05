const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT
const router = require('./Router/route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// What is node and what is express?
// what is the difference between both?
// what is the use of both (node and express)?