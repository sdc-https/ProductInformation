const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Information', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error Connecting Database'));
db.once('open', function() {
  console.log('Database Connected');
});

const fakeSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true
  },
  aspectRatio: String,
  rating: String,
  dimensions: String,
  format: String,
  runTime: String,
  releaseDate: Date,
  cast: Array,
  studio: String,
  numberOfDisks: Number,
});


let Information = mongoose.model('Information', fakeSchema);


const save = (newSeed) => {
  newSeed.map((record) => {
    let newRecord = new Information(record);
    newRecord.save(function(err, response) {
      if (err) {
        console.log('Error Saving Database: ', err);
      } else {
        console.log('Saved to Database', response);
      }
    });
  });
};

//save(seed.newSeed);

let returnData = (id) => {
  return Information.findOne({productId: id}).exec();
};


module.exports.returnData = returnData;
module.exports.Information = Information;