require('dotenv').config();
const express = require('express');
const app = express();

// 1. Meet the Node console
console.log('Hello World');

// 2. Start a Working Express Server
// 3. Serve an HTML File
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// 4. Serve Static Assets
app.use('/public', express.static(__dirname + '/public'));

// 5. Serve JSON on a Specific Route
// 6. Use the .env File
app.get('/json', (req, res) => {
  const message = 'Hello json';
  res.json({ message: process.env.MESSAGE_STYLE === 'uppercase' ? message.toUpperCase() : message });
});

// 7. Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// 8. Chain Middleware to Create a Time Server
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
});

// 9. Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

// 10. Get Query Parameter Input from the Client
app.get('/name', (req, res) => {
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
});

// 11. Use body-parser to Parse POST Requests
// 12. Get Data from POST Requests
app.use(express.urlencoded({ extended: false }));
app.post('/name', (req, res) => {
  const { first, last } = req.body;
  res.json({ name: `${first} ${last}` });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;
