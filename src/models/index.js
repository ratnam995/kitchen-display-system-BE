const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);

const env = process.env.NODE_ENV || 'development';

const config = require(`${__dirname}/../config/config.json`)[env]; // eslint-disable-line

const db = {};

console.log("this config", config);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  config.logging
);

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  console.log("modelName 1", modelName);
  if (db[modelName].associate) {
    console.log("modelName 2", modelName);
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

(module.exports = db), { sequelize }; // eslint-disable-line
