var express = require('express')

function getRoot (req, res) {
  res.render('generic', {
    title: 'Verein'
  })
}

module.exports = function (db) {
  var router = express.Router()

  router.get('/', getRoot)

  return router
}
