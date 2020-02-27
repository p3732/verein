const express = require('express')

var EventType

function getAll (req, res) {
  EventType.findAll()
    .then((data) => {
      res.send(data)
    })
}

function getByID (req, res) {
  EventType.findOne({
    where: req.params
  })
    .then((data) => {
      res.send(data)
    })
}

module.exports = function (db) {
  var router = express.Router()

  EventType = db.models.EventType
  router.get('/', getAll)
  router.get('/:id', getByID)

  return router
}
