const bodyParser = require('body-parser')
const express = require('express')
const favicon = require('express-favicon')
const fs = require('fs')
const log = require('./logging.js')('router', 6)
const path = require('path')

/** Routes all definitions made in the given @param file to the given @param route. */
function routeFile (file, route, router, db) {
  log('routing ' + route)
  const subRouter = require('' + file)(db)
  router.use(route, subRouter)
}

/**
 * Initialize all routes including subfolders. Bind according to name of file.
 * For example:
 * index.js will be mapped to /
 * contacts/index.js will be mapped to /contacts
 * contacts/groups.js will be mapped to /contacts/groups
 * @param currentFolder the folder currently in
 */
function routeRecursive (folder, routePath, router, db) {
  fs.readdirSync(folder)
    .forEach(function (file) {
      var currentFile = path.join(folder, file)

      if (fs.lstatSync(currentFile).isDirectory()) {
        routeRecursive(currentFile, routePath + file + '/', router, db)
      } else if (file.endsWith('.js')) {
        var route

        if (file.toLowerCase() === 'index.js') {
          // cut off the '/' of the path, unless it's the whole path
          route = routePath.substring(0, routePath.lastIndexOf('/'))
          if (route === '') { route = '/' }
        } else {
          // cut off the '.js' and append to routePath
          route = routePath + file.substring(0, file.lastIndexOf('.js'))
        }
        routeFile(currentFile, route, router, db)
      } // else ignore
    })
}

function create404 (req, res, next) {
  var err = new Error('Not Found.')
  err.status = 404
  next(err)
}

function errorHandler (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    // no stacktraces leaked to user unless in development mode
    error: global.developerMode ? err : {}
  })
}

/** Sets up routing. */
function init (db) {
  const router = express()

  try {
    // folders
    const apiFolder = path.join(__dirname, 'api')
    const pagesFolder = path.join(__dirname, 'pages')
    const staticFolder = path.join(__dirname, 'static')
    const viewsFolder = path.join(__dirname, 'views')

    // favicon
    log('setting favicon')
    router.use(favicon(path.join(staticFolder, 'img', 'favicon', 'favicon.png')))

    // view engine setup
    log('setting view engine')
    router.set('views', viewsFolder)
    router.set('view engine', 'pug')

    // body parser
    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))

    // route
    log('setting up api')
    routeRecursive(apiFolder, '/api/', router, db)
    log('setting up static content')
    router.use('/', express.static(staticFolder))
    log('setting up pages')
    routeRecursive(pagesFolder, '/', router, db)
    log('setting up default 404 fallback')
    router.use(create404)
    log('setting up error handler')
    router.use(errorHandler)
    log.info('routing set up')
  } catch (err) {
    log.error('error occured during routing: ' + err)
  };

  return router
}

module.exports = init
