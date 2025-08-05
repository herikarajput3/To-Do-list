const express = require('express')
const app = express() // it is a function that creates an instance of an Express application which is used to handle requests and responses in a web application.
// Express is a web framework for Node.js that simplifies the process of building web applications and APIs by providing a robust set of features and middleware.

require('dotenv').config()
const port = process.env.PORT || 5000;
const router = require('./Router/route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// What is node and what is express?
/*
Node.js is a runtime environment: it lets you run JavaScript code on your computer, not just in a browser. This is what makes it possible to build servers and backend applications in JavaScript.

Express.js is a framework built on top of Node.js. It gives you useful functions, tools, and structure for making web APIs and handling requests easily.

*/
// what is the difference between both?

/*
Node.js is the engine that executes your code.
Express.js is like a toolkit that simplifies building web apps and APIs with Node.js.
*/

// what is the use of both (node and express)?
/*
Node.js: Runs your server, handles file operations, database connections, etc.

Express.js: Makes it easy to set up API endpoints, manage routes, handle incoming requests easily, and respond with data.

*/