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

const get = (id) => {
  id = id.toString();
  return Information.findOne({productId: id}).exec();
};

const count = () => {
  return Information.countDocuments().exec();
};

const post = (record) => {
  let newRecord = new Information(record);
  return newRecord.save();
};

const update = (id, update) => {
  id = id.toString();
  return Information.findOneAndUpdate({
    productId: id
  }, update, {
    new: true,
    upsert: true,
    overwrite: false,
    useFindAndModify: false
  }).exec();
};

const deleteOne = (id) => {
  id = id.toString();
  return Information.deleteOne({ productId: id}).exec();
};

module.exports = {
  Information,
  get,
  count,
  post,
  update,
  deleteOne
};
