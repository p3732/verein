const fs   = require('fs');
const log  = require("./logging.js")("config");
const path = require('path');

/** Reads config in given @param file. (readability wrapper) */
function readConfig(file) {
  var newConfig = require(file);
  return newConfig;
}

/** Adds a config @param subConfig to a @param parentConfig by setting it as a property called @param name. */
function addSubConfig(subConfig, parentConfig, name) {
  parentConfig[name] = subConfig;
}

/** Recursively reads through @param currentFolder. Merges all config files into one config object which is returned. */
function readConfigsRecursive(currentFolder, config) {
  log.indent();
  // use either given config or (if not given) an empty config
  var currentConfig = config || {};

  fs.readdirSync(currentFolder).forEach(function (file) {
    var currentFile = path.join(currentFolder, file);

    if (fs.lstatSync(currentFile).isDirectory()) {
      log("entering   " + currentFile);
      var subConfig = readConfigsRecursive(currentFile);
      addSubConfig(subConfig, currentConfig, file);
    } else if (file.endsWith('.json')) {
      log("processing " + currentFile);
      if (file.toLowerCase() == "index.json") {
        var subConfig = readConfig(currentFolder);
        // no wrapping needed, will be done by outer recursion
        currentConfig = Object.assign(currentConfig, subConfig);
      } else {
        file = file.substring(0, file.lastIndexOf('.json'));
        var subConfig = readConfig(currentFile);
        addSubConfig(subConfig, currentConfig, file);
      }
    } // else ignore
  });

  log.undent();
  return currentConfig;
}

/** Initiates loading of config files from  */
this.load = function load(folder) {
  return new Promise(() => {
    var configPath = path.resolve(folder);
    log("loading " + configPath);
    readConfigsRecursive(configPath, this);
    log("configs loaded");
  })
}

module.exports = this;
