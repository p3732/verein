var express = require('express');
//var log     = require("../../logging.js")("api/event/type");

// globally available variables
var EventType;

function getOneType(req, res) {
  EventType.findOne({
    where: req.params
  })
  .then((data) => {
    res.send(data);
  });
}

function getAllTypes(req, res) {
  EventType.findAll()
  .then((data) => {
    res.send(data);
  });
}

module.exports = function(db) {
  var router = express.Router();

  EventType = db.sequelize.models.EventType;

  router.get("/", getAllTypes);
  router.get("/:id", getOneType);

  return router;
}
