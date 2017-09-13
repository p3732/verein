const express = require('express');
const favicon = require('serve-favicon');
const fs      = require('fs');
const log     = require("./logging.js")("router");
const path    = require('path');

/** Routes all definitions made in the given @param file to the given @param route. */
function routeFile(file, route, router, db) {
  var subRouter = require('' + file)(db);
  router.use(route, subRouter);
}

/*
 * Initialize all routes including subfolders. Bind according to name of file.
 * For example:
 * index.js will be mapped to /
 * contacts/index.js will be mapped to /contacts
 * contacts/groups.js will be mapped to /contacts/groups
 * @param currentFolder the folder currently in
 */
function routeRecursive(folder, routePath, router, db) {
  log.indent();
  fs.readdirSync(folder)
    .forEach(function(file) {
      var currentFile = path.join(folder, file);

      if (fs.lstatSync(currentFile).isDirectory()) {
        log("entering " + file);
        routeRecursive(currentFile, routePath + file + '/', router, db);
      } else if (file.endsWith(".js")) {
        log("routing " + file);
        var route;

        if (file.toLowerCase() == "index.js") {
          // cut off the '/' of the path, unless it's the whole path
          if(routePath.lastIndexOf('/') !== routePath.indexOf('/')) {
            route = routePath.substring(0, routePath.lastIndexOf('/'));
          } else {
            route = '/';
          }
        } else {
          // cut off the '.js'
          route = file.substring(0, file.lastIndexOf(".js"));
        }
        routeFile(currentFile, route, router, db);
      } // else ignore
    });
  log.undent();
}

var router = express();

/** Sets up routing. */
router.init = function(router, db) {
  return new Promise(() => {
    log("init routing");
    router.use(favicon(path.join(__dirname, "media", "favicon", "favicon.png")));
    var folder = path.join(__dirname, "api");
    routeRecursive(folder, '/', router, db);
  })
  .then(log("routing set up"))
  .catch(function (err) {
    log("error occured during routing: " + err);
  });
}

module.exports = router;
