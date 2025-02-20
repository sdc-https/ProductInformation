const { Information } = require ('./mongo.js');
const faker = require('faker');

let seedData = async () => {
  let productId = 0;
  for (let k = 1; k <= 1000; k++) {
    let information = [];
    let ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
    let formats = ['Color', 'NTSC', 'Subtitled', 'Widescreen', 'Multiple Formats', 'Full Screen', 'Dolby', 'Dubbed', 'NTSC'];
    for (let i = 1; i <= 10000; i++) {
      productId++;
      let castList = [];
      for (let j = 1; j <= 4; j++) {
        castList.push(faker.name.findName());
      }
      let newRecord = {
        productId: productId,
        aspectRatio: (faker.datatype.number(5)) + ':' + (faker.datatype.number(5)),
        rating: ratings[(Math.floor(Math.random() * 4))],
        dimensions: (faker.datatype.number(10)) + ' x ' + (faker.datatype.number(5)) + ' x ' + (faker.datatype.number(2)) + ' Inches',
        format: formats[(Math.floor(Math.random() * 8))],
        runTime: Math.floor(Math.random() * 4) + ' hours and ' + Math.floor(Math.random() * 59) + ' minutes',
        releaseDate: faker.date.between('1995-01-01', '2022-01-01'),
        cast: castList,
        studio: faker.name.findName(),
        numberOfDisks: faker.datatype.number(3),
      };
      information.push(newRecord);
    }
    await Information.insertMany(information)
      .then(() => console.log(`Inserted 10000 docs ${k} times`))
      .catch((err) => console.log('Error loading records:', err));
  }
};


seedData();





