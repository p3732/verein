const log  = require("./logging.js")("verein");

/*
 * Starting function. Startup order is:
 * A-load configuration
 *   load recursively from ./config directory
 * B-connect and init db with sequelize
 *   1- establish connection
 *   2- initialization
 *   3- schemes sync
 *   4-[opt if creating a new db] db initialization with default values
 * C-set up routing with express
 *   set routes recursively from ./api directory
 * D-bind to localhost and start
 */
function start() {
  var config = require("./config.js");
  var db     = require("./db.js");
  var router = require("./router.js");
  var server = require("./server.js");

  log("starting");
  config.load("./config")
  //.then(log.debug(JSON.stringify(config)))
  .then(db.init(config.db))
  .then(router.init(router, db))
  .then(server.start(config.server, router))
  .catch(function (err) {
    log.error("Server crashed. Error was: ", err);
  });
}

module.exports = start;
