
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://www.freecodecamp.org'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// First challenge
console.log('Hello World');

// Temporary test endpoint
app.get('/_api/hello-console', (req, res) => {
  console.log('Hello World');
  res.json({ passed: true });
});

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Parse POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Serve static assets
app.use('/public', express.static(__dirname + '/public'));

// JSON route
app.get('/json', (req, res) => {
  const message = 'Hello json';

  res.json({
    message:
      process.env.MESSAGE_STYLE === 'uppercase'
        ? message.toUpperCase()
        : message
  });
});

// Time server
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
});

// Route parameters
app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

// Query parameters
app.get('/name', (req, res) => {
  const { first, last } = req.query;

  res.json({
    name: `${first} ${last}`
  });
});

// POST request
app.post('/name', (req, res) => {
  const { first, last } = req.body;

  res.json({
    name: `${first} ${last}`
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
