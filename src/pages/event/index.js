const express = require('express')
const log = require('../../logging.js')('/event', 6)

var Event
var EventDate

function getAllEvents (req, res) {
  /*
  // TODO parse request
  //log(JSON.stringify(req.query));
  // TODO respond depending on current date
  var start = Date.now();
  var end = start + aproximatelyOneMonth;
  */
  log('all events')
  Event.findAll({
    attributes: ['id', 'publish', 'title']
  })
    .then(function (events) {
      return res.render('event/add_event', {
        title: 'Existing events',
        events: events
      })
    })
  // .then(res.redirect('/event'))
    .catch(function (err) {
      log.error(err)
      throw err
    })

  /*
  getEventDatesBetween(start, end)
  .then(getEventIdsFromEventDates)
  .then(getEventsWithIds)
  .then(send(res));
  */
}

module.exports = function (db) {
  Event = db.models.Event
  EventDate = db.models.EventDate

  var router = express.Router()
  router.get('/', getAllEvents)

  return router
}
