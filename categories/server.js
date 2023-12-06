// server.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/route');
const connection = require('./db/db.config');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', routes);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
