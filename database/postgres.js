const newrelic = require('newrelic');
const Sequelize = require('sequelize');
const databaseName = 'productinformation';

const postgres = new Sequelize(databaseName, 'fredericrosselet', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

postgres.authenticate()
  .then(() => {
    console.log('connected to Postgres:', databaseName);
  })
  .catch((error) => {
    console.error('unable to connect to Postgres:', error);
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


const casts = {

  get: async (id) => {
    let cast = await Cast.findByPk(id);
    if (cast.dataValues) {
      return cast.dataValues;
    } else {
      console.log(`Error retrieving cast for id ${id}`);
    }
  },

  postOne: async (data) => {
    let cast = await Cast.create({
      actor_one: data[0],
      actor_two: data[1],
      actor_three: data[2],
      director: data[3]
    });
    if (cast.dataValues.id) {
      return cast.dataValues.id;
    } else {
      console.log('Error adding cast to database:', data);
    }
  },

  postMany: async (data) => {
    await Cast.bulkCreate(data)
      .catch((err) => console.log('Error adding casts to database:', err));
  },

  update: async (id, data) => {
    await Cast.update({
      actor_one: data[0],
      actor_two: data[1],
      actor_three: data[2],
      director: data[3]
    }, {
      where: { id: id }
    })
      .catch((err) => console.log('Error updating cast in database:', err));
  },

  deleteOne: async (id) => {
    await Cast.destroy({
      where: { id: id }
    })
      .catch((err) => console.log('Error deleting cast in database:', err));
  }

};

const information = {

  get: async (id) => {
    let info = await Information.findByPk(id);
    if (info.dataValues) {
      return {
        aspectRatio: info.dataValues.aspect_ratio,
        rating: info.dataValues.rating,
        dimensions: info.dataValues.dimensions,
        format: info.dataValues.format,
        runTime: info.dataValues.run_time,
        studio: info.dataValues.studio,
        numberOfDisks: info.dataValues.number_of_disks
      };
    } else {
      console.log(`Error retrieving DVDinfo for id ${id}`);
    }
  },

  postOne: async (data) => {
    let info = await Information.create({
      aspect_ratio: data.aspectRatio,
      rating: data.rating,
      dimensions: data.dimensions,
      format: data.format,
      run_time: data.runTime,
      studio: data.studio,
      number_of_disks: data.numberOfDisks
    });
    if (info.dataValues.id) {
      return info.dataValues.id;
    } else {
      console.log('Error adding DVDinfo to database:', data);
    }
  },

  postMany: async (data) => {
    await Information.bulkCreate(data)
      .catch((err) => console.log('Error adding DVDinfos to database:', err));
  },

  update: async (id, data) => {
    await Information.update(data, {
      where: { id: id }
    })
      .catch((err) => console.log('Error updating DVDinfo in database:', err));
  },

  deleteOne: async (id) => {
    await Information.destroy({
      where: { id: id }
    })
      .catch((err) => console.log('Error deleting DVDinfo in database:', err));
  }
};

module.exports = {
  informationPostMany: information.postMany,
  castsPostMany: casts.postMany,

  post: async (data) => {
    await casts.postOne(data.cast);
    let infoId = await information.postOne(data);
    return infoId;
  },

  get: async (id) => {
    let cast = await casts.get(id);
    let info = await information.get(id);
    info.cast = Object.values(cast).slice(1);
    return info;
  },

  update: async (id, data) => {
    if (data.cast) {
      if (Object.keys(data).length > 1) {
        casts.update(id, data.cast);
        information.update(id, data);
      } else {
        casts.update(id, data.cast);
      }
    } else {
      information.update(id, data);
    }
  },

  deleteOne: async (id) => {
    await casts.deleteOne(id);
    await information.deleteOne(id);
  }

};