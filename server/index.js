// const newrelic = require('newrelic');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const postgresDb = require('../database/postgres.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const shrinkRay = require('shrink-ray-current');
const morgan = require('morgan');

const host = process.env.INFORMATION_HOST || 'localhost';
const port = process.env.INFORMATION_PORT || 3001;

app.options('*', cors());
app.get('*', cors());
app.use(cors());
app.use(shrinkRay());
app.use(bodyParser.json());
app.use(morgan('tiny'));


app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('*/dp/:productId', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

// CREATE
app.post('/Information', (req, res) => {
  postgresDb.post(req.body)
    .then((result) => res.json(result))
    .catch((error) => console.log('Error saving new entry:', error));
});

// READ
//Specific Product Id Fetcher
// app.get('/:productId', function (req, res) {
//   if (req.params.productId === 'Information') {
//     return postgresDb.get('1')
//       .then((currentDVD) => {
//         res.json(currentDVD);
//       })
//       .catch((error) => {
//         console.log('Error retrieving specific DVD', error);
//       });
//   }
//   res.sendFile(path.join(__dirname, '..', 'public/index.html'));
// });

//API Call for specific product ID
app.get('/Information/:productId', function (req, res) {
  let productId = Number(req.params.productId);
  if (productId) {
    // console.log('Retrieving data for productId:', productId);
    return postgresDb.get(productId)
      .then((currentDVD) => res.json(currentDVD))
      .catch((error) => console.log('Error retrieving specific DVD', error));
  } else {
    console.log('Invalid productId');
  }
});


// UPDATE
app.put('/Information/:productId', (req, res) => {
  postgresDb.update(Number(req.params.productId), req.body)
    .then((result) => res.status(201).end())
    .catch((error) => console.log('Error updating record:', error));
});

// DELETE
app.delete('/Information/:productId', (req, res) => {
  postgresDb.deleteOne(Number(req.params.productId))
    .then((result) => res.status(200).end())
    .catch((error) => console.log('Error deleting record:', error));
});


app.listen(port, () => {
  console.log(`Server now listening at http://${host}:${port}`);
});
