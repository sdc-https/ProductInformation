const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Information', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
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


const Information = mongoose.model('Information', fakeSchema);

const returnData = (id) => {
  return Information.findOne({productId: id}).exec();
};

const countEntries = () => {
  return Information.countDocuments().exec();
};

const createEntry = (record) => {
  let newRecord = new Information(record);
  return newRecord.save();
};

const updateEntry = (id, update) => {
  return Information.findOneAndUpdate({
    productId: id
  }, update, {
    new: true,
    upsert: true,
    overwrite: false
  }).exec();
};

const deleteEntry = (id) => {
  return Information.deleteOne({ productId: id}).exec();
}

module.exports = {
  Information,
  returnData,
  countEntries,
  createEntry,
  updateEntry,
  deleteEntry
};
