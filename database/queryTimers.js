const axios = require('axios');
const postgresFetch = require('./postgres.js').get;
const couchDbConfig = require('../couchDb.config.js');
const couchDb = 'productinformation';
const couchDbUrl = `http://${couchDbConfig.username}:${couchDbConfig.password}@localhost:5984/${couchDb}`;
const mongoDbFetch = require('./mongo.js').get;

const timePostgres = async () => {

  console.time('Postgres query test 1');
  await postgresFetch(1)
    .then(() => console.timeEnd('Postgres query test 1'))
    .catch((err) => console.log(err));

  console.time('Postgres query test 2');
  await postgresFetch(5000000)
    .then(() => console.timeEnd('Postgres query test 2'))
    .catch((err) => console.log(err));

  console.time('Postgres query test 3');
  await postgresFetch(10000000)
    .then(() => console.timeEnd('Postgres query test 3'))
    .catch((err) => console.log(err));
};

const timeCouchDb = async () => {

  console.time('CouchDB query test 1');
  await axios.get(`${couchDbUrl}/1`)
    .then(() => {
      console.timeEnd('CouchDB query test 1');
    })
    .catch((err) => console.log(err));

  console.time('CouchDB query test 2');
  await axios.get(`${couchDbUrl}/5000000`)
    .then(() => {
      console.timeEnd('CouchDB query test 2');
    })
    .catch((err) => console.log(err));

  console.time('CouchDB query test 3');
  await axios.get(`${couchDbUrl}/10000000`)
    .then(() => {
      console.timeEnd('CouchDB query test 3');
    })
    .catch((err) => console.log(err));
};

const timeMongoDb = async () => {

  console.time('MongoDB query test 1');
  await mongoDbFetch(1)
    .then(() => console.timeEnd('MongoDB query test 1'))
    .catch((err) => console.log(err));

  console.time('MongoDB query test 2');
  await mongoDbFetch(5000000)
    .then(() => console.timeEnd('MongoDB query test 2'))
    .catch((err) => console.log(err));

  console.time('MongoDB query test 3');
  await mongoDbFetch(10000000)
    .then(() => console.timeEnd('MongoDB query test 3'))
    .catch((err) => console.log(err));
};

const timeAll = async () => {
  await timePostgres();
  await timeCouchDb();
  await timeMongoDb();
};

timeAll();