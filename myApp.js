
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 7. Root-Level Request Logger Middleware
// Must be before all routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// 1. Meet the Node console
console.log('Hello World');

// 2-3. Serve HTML File
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// 4. Serve Static Assets
app.use('/public', express.static(__dirname + '/public'));

// 5-6. Serve JSON and use environment variables
app.get('/json', (req, res) => {
  const message = 'Hello json';

  res.json({
    message: process.env.MESSAGE_STYLE === 'uppercase'
      ? message.toUpperCase()
      : message
  });
});

// 8. Chain Middleware
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
});

// 9. Get Route Parameter Input
app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

// 10. Get Query Parameter Input
app.get('/name', (req, res) => {
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
});

// 11. Parse POST Request Body
app.use(bodyParser.urlencoded({ extended: false }));

// 12. Get Data from POST Requests
app.post('/name', (req, res) => {
  const { first, last } = req.body;

  res.json({
    name: `${first} ${last}`
  });
});

module.exports = app;
