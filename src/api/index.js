var express = require('express');

function getAPIdescription(req, res) {
  res.render("docs/api/index", {
      title: "/"
    })
}

module.exports = function(db) {
  var router = express.Router();
  router.get('/', getAPIdescription);

  return router;
}
