const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const db = require('../database/index.js');
const bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Random DVD Fetcher
app.get('/Information/', function (req, res) {
  let id = Math.floor(Math.random() * 100);
  console.log('Getting a random DVD');
  return db.returnData(id)
    .then((dvd) => {
      console.log('SERVER DVD', dvd);
      res.send(dvd);
    });
});

//API Call for specific product ID
app.get('/Information/:productId', function (req, res) {
  console.log('Specific DVD Request:', req.params.productId);
  return db.returnData(req.params.productId)
    .then((currentDVD) => {
      console.log('Retrieved specific DVD', currentDVD);
      res.json(currentDVD);
    })
    .catch((error) => {
      console.log('Error retrieving specific DVD', error);
    });
});


app.listen(port, () => {
  console.log(`Server now listening at http://localhost:${port}`);
});
