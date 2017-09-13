var express = require('express');

function getRoot(req, res) {
  res.send("This is the API. Functionality is yet to come.");
}

module.exports = function(db) {
  var router = express.Router();

  router.get('/', getRoot);

  return router;
}
