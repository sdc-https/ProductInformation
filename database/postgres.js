const Sequelize = require('sequelize');
const databaseName = 'productinformation';

const postgres = new Sequelize(databaseName, 'fredericrosselet', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    acquire: 2000000000
  }
});

postgres.authenticate()
  .then(() => {
    console.log('connected to postgres database:', databaseName);
  })
  .catch((error) => {
    console.error('unable to connect to postgres database:', error);
  });


const Cast = postgres.define('cast', {
  actor_one: Sequelize.STRING,
  actor_two: Sequelize.STRING,
  actor_three: Sequelize.STRING,
  director: Sequelize.STRING
}, {
  timestamps: false
});

const Information = postgres.define('information', {
  aspect_ratio: Sequelize.STRING,
  rating: Sequelize.STRING,
  dimensions: Sequelize.STRING,
  format: Sequelize.STRING,
  run_time: Sequelize.STRING,
  studio: Sequelize.STRING,
  number_of_disks: Sequelize.INTEGER,
}, {
  timestamps: false
});


module.exports = {
  casts: {

    get: async (id) => {
      let cast = await Cast.findByPk(id);
      if (cast.dataValues) {
        return cast.dataValues;
      } else {
        console.log(`Error retrieving cast for id ${id}`);
      }
    },

    post: async (data) => {
      await Cast.bulkCreate(data)
        .catch((err) => console.log('Error adding casts to database:', err));
    }
  },

  information: {

    get: async (id) => {
      let info = await Information.findByPk(id);
      if (info.dataValues) {
        return info.dataValues;
      } else {
        console.log(`Error retrieving DVDinfo for id ${id}`)
      }
    },

    post: async (data) => {
      await Information.bulkCreate(data)
        .catch((err) => console.log('Error adding DVDinfos to database:', err));
    }
  }
};