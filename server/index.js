const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const db = require('../database/index.js');

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});


app.get('*/dp/:productid', (req, res) => {
  console.log('GETTING TO DP CALL');
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

//Specific Product Id Fetcher
app.get('/:productId', function (req, res) {
  if (req.params.productId === 'Information') {
    return db.returnData('1')
      .then((currentDVD) => {
        console.log('Retrieved specific DVD', currentDVD);
        res.json(currentDVD);
      })
      .catch((error) => {
        console.log('Error retrieving specific DVD', error);
      });
  }
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});


//API Call for specific product ID
app.get('/Information/:productId', function (req, res) {
  console.log('Specific DVD Request:', req.params.productId);
  if (req.params.productId) {
    return db.returnData(req.params.productId)
      .then((currentDVD) => {
        console.log('Retrieved specific DVD', currentDVD);
        res.json(currentDVD);
      })
      .catch((error) => {
        console.log('Error retrieving specific DVD', error);
      });
  } else {
    return db.returnData('1')
      .then((currentDVD) => {
        console.log('Retrieved specific DVD', currentDVD);
        res.json(currentDVD);
      })
      .catch((error) => {
        console.log('Error retrieving specific DVD', error);
      });
  }
});



app.listen(port, () => {
  console.log(`Server now listening at http://localhost:${port}`);
});
