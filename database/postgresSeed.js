const postgresDb = require('./postgres.js');
const faker = require('faker');

const saveCasts = async (noOfRecords) => {
  let casts = [];
  for (let i = 0; i < noOfRecords; i++) {
    let cast = {
      actor_one: faker.name.findName(),
      actor_two: faker.name.findName(),
      actor_three: faker.name.findName(),
      director: faker.name.findName()
    };
    casts.push(cast);
  }

  await postgresDb.castsPostMany(casts);
};

const saveInformation = async (noOfRecords) => {

  const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  const formats = ['Color', 'NTSC', 'Subtitled', 'Widescreen', 'Multiple Formats', 'Full Screen', 'Dolby', 'Dubbed', 'NTSC'];

  let records = [];

  for (let i = 0; i < noOfRecords; i++) {
    let DVDInfo = {
      aspect_ratio: (faker.datatype.number(5)) + ':' + (faker.datatype.number(5)),
      rating: ratings[(Math.floor(Math.random() * 4))],
      dimensions: (faker.datatype.number(10)) + ' x ' + (faker.datatype.number(5)) + ' x ' + (faker.datatype.number(2)) + ' Inches',
      format: formats[(Math.floor(Math.random() * 8))],
      run_time: Math.floor(Math.random() * 4) + ' hours and ' + Math.floor(Math.random() * 59) + ' minutes',
      studio: faker.name.findName(),
      number_of_disks: faker.datatype.number({ 'min': 1, 'max': 9})
    };
    records.push(DVDInfo);
  }

  await postgresDb.informationPostMany(records);
};

const createRecords = async (noOfTimes) => {
  for (let i = 0; i < noOfTimes; i++) {
    await saveCasts(10000);
    await saveInformation(10000);
    console.log('saved 10000 records');
  }
};

createRecords(1000);

