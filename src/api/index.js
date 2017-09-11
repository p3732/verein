var express = require('express');

function getRoot(req, res) {
  res.send("You're at /\nGood job!");
}

module.exports = function(db) {
  var router = express.Router();

  router.get('/', getRoot);

  return router;
}
