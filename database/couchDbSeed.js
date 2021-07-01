const axios = require('axios');
const faker = require('faker');
const config = require('../couchDb.config.js');
const database = 'productinformation';

const url = `http://${config.username}:${config.password}@localhost:5984/${database}`;

const generate = async (outer, inner) => {
  let productId = 0;
  for (let i = 0; i < outer; i++) {
    let records = [];
    for (let j = 0; j < inner; j++) {
      productId++;
      console.log(productId);
      const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
      const formats = ['Color', 'NTSC', 'Subtitled', 'Widescreen', 'Multiple Formats', 'Full Screen', 'Dolby', 'Dubbed', 'NTSC'];
      let DVDInfo = {
        productId: productId,
        cast: [faker.name.findName(), faker.name.findName(), faker.name.findName(), faker.name.findName()],
        aspectRatio: (faker.datatype.number(5)) + ':' + (faker.datatype.number(5)),
        rating: ratings[(Math.floor(Math.random() * 4))],
        dimensions: (faker.datatype.number(10)) + ' x ' + (faker.datatype.number(5)) + ' x ' + (faker.datatype.number(2)) + ' Inches',
        format: formats[(Math.floor(Math.random() * 8))],
        runTime: Math.floor(Math.random() * 4) + ' hours and ' + Math.floor(Math.random() * 59) + ' minutes',
        studio: faker.name.findName(),
        numberOfDisks: faker.datatype.number({ 'min': 1, 'max': 9})
      };
      records.push(DVDInfo);
    }
    await axios.post(url, { records })
      .catch((err) => console.log('Error loading records:', err));
  }
}

generate(1000, 10000);

