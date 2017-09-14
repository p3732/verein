const log  = require("./logging.js")("verein");

/*
 * Starting function. Startup order is:
 * A-config
 *   load recursively from ./config directory
 * B-database
 *   connect and init db with sequelize
 * C-router
 *   set up routing with express and set pug to be used for rendering pages
 * D-server
 *   bind to localhost and start
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
  .then(router.init(router, db, config.mode))
  .then(server.start(config.server, router))
  .then(modeWarning(config.mode))
  .catch(function (err) {
    log.error("Server crashed. Error was: ", err);
  });
}

function modeWarning(mode) {
  if (mode !== "normal") {
    log("################################### !!! Running in " + mode + " mode !!! ###################################");
  } else {
    log("Running in normal mode.");
  }
}

module.exports = start;
