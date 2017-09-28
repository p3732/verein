var express = require('express');
var log     = require("../../logging.js")("api/event");

// globally available variables
var Event;
var EventDate;

function getAPIdescription(req, res) {
  res.render("docs/api/event", {
      title: "/event/"
    })
}

function createEventDate(start, end, event_id) {
  return EventDate.create({
    start: start,
    end: end,
    EventId: event_id
  })
}

function createEvent(req, res) {
  var now = Date.now();
  log(JSON.stringify(req.body));
  // end date is optional
  if(!req.body.end) {
    req.body.end = req.body.start
  }
  log("CREATE: publish: "+ req.body.publish +
      " title: " + req.body.title +
      " description: " + req.body.description +
      " start: " + req.body.start +
      " end: " + req.body.end)
  Event.create({
    publish: req.body.publish,
    title: req.body.title,
    description: req.body.description
  })
  .then(function(event) {
    return createEventDate(req.body.start,
                           req.body.end,
                           event.id);
  })
  .then(res.redirect("back"));
}

function destroyEvent(req, res) {
  log(req.params);
  Event.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(log.debug("deleted "))
  .then(res.redirect("back"));
}

function getEvent(req, res) {
  Event.findOne({
    where: req.params
  })
  .then((data) => {
    res.send(data);
  });
}

module.exports = function(db) {
  var router = express.Router();

  Event = db.sequelize.models.Event;
  EventDate = db.sequelize.models.EventDate;

  router.get("/", getAPIdescription);
  router.post("/", createEvent);
  router.post("/create", createEvent);
  router.get("/:id", getEvent);
  // destroy with post instead of get, so simply visiting the url does not accidently destroy element
  router.post("/:id/destroy", destroyEvent);

  return router;
}
