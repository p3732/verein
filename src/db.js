const fs        = require('fs');
const log       = require("./logging.js")("db    ");
const path      = require('path');
const Sequelize = require('sequelize');

/** Connect to DB. Returns Promise.*/
function connect(sequelize) {
  log("connecting to db");
  return sequelize.authenticate()
    .then(log("connection has been established successfully"))
    .catch(function (err) {
      log.error("Unable to connect to the database: ", err)
    });
}

/** Sync models. Returns Promise.*/
function syncSchemes(sequelize) {
  log("sync db");
  return sequelize
    .sync() // {force:true} as parameter deletes existing entries in tables
    .then(log("Synced database models."))
    .catch(function (err) {
      log.error("Could not synchronize database: " + err);
    });
}

/** Load models. Returns Promise.*/
function loadModels(db) {
  return new Promise(() => {
      log("loading models");
      var folder = path.join(__dirname, "models");
      loadModelsRecursive(folder, db);
    })
    .then(log("loaded models"))
    .catch(function (err) {
      console.error('An error occurred while loading the models:', err);
    });
}
/** Loads models recursively from given @param folder and adds them to the @param db. */
function loadModelsRecursive(folder, db) {
  log.indent();
  fs.readdirSync(folder)
    .forEach(function(file) {
      var currentFile = path.join(folder, file);

      if (fs.lstatSync(currentFile).isDirectory()) {
        log("entering " + file);
        loadModelsRecursive(currentFile, db);
      } else if (file.endsWith('.js') && file.toLowerCase() !== "index.js") {
        log("loading  " + file);
        var model = db.sequelize.import(currentFile);
        db.models[model.name] = model;
      } // else ignore
    });
  log.undent();
}

/** Creates associations for @param models. Returns Promise. */
function createAssociations(models) {
  return new Promise(() => {
      log("loading associations");
      log.indent();
      Object.keys(models).forEach(function(modelName) {
        if ("associate" in models[modelName]) {
          log("loading for " + modelName);
          models[modelName].associate(models);
        }
      })
    })
    .then(log.undent())
    .then(log("loaded associations"));
}

/** Init function of the db. Returns Promise.
 * 1-establish connection
 * 2-load models
 * 3-load associations
 * 4-sync models
 * TODO 5-[opt if creating a new db] db initialization with default values
 */
this.init = function init(db_conf) {
  this.models = {};
  this.sequelize = new Sequelize(db_conf.uri, {
    logging: db_conf.logging
  });

  return connect(this.sequelize)
    .then(loadModels(this))
    .then(createAssociations(this.models))
    .then(syncSchemes(this.sequelize))
}

module.exports = this;
