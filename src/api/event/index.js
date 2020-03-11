const express = require('express')
const log = require('../../logging.js')('api', 6)

var Event
var EventDate

function getAPIdescription (req, res) {
  res.render('docs/api/event', {
    title: '/event/'
  })
}

function createEventDate (start, end, eventID) {
  return EventDate.create({
    start: start,
    end: end,
    EventId: eventID
  })
}

function createEvent (req, res) {
  var now = Date.now()
  log(JSON.stringify(req.body))
  // end date is optional
  if (!req.body.end) {
    req.body.end = req.body.start
  }
  log('CREATE: publish: ' + req.body.publish +
      ' title: ' + req.body.title +
      ' description: ' + req.body.description +
      ' start: ' + req.body.start +
      ' end: ' + req.body.end)
  Event.create({
    publish: req.body.publish,
    title: req.body.title,
    description: req.body.description
  })
    .then(function (event) {
      return createEventDate(req.body.start,
        req.body.end,
        event.id)
    })
    .then(res.redirect('back'))
}

function getAllEvents (req, res) {
  Event.findAll({
    attributes: ['id', 'publish', 'title']
  })
    .then((data) => {
      return res.send(data)
    })
    .catch(function (err) {
      log.error(err)
      throw err
    })
}

function getEvent (req, res) {
  Event.findOne({
    where: {
      id: req.params.eventID
    }
  })
    .then((data) => {
      res.send(data)
    })
}

function destroyEvent (req, res) {
  // TODO check for delete permission
  try {
    Event.destroy({
      where: {
        id: req.params.eventID
      }
    })
      .then(log.debug('deleted ' + req.params.eventID))
      .then(res.send('OK'))
  } catch (err) {
    log.warn('received invalid delete request:' + err)
    res.send('FAIL')
  }
}

module.exports = function (db) {
  var router = express.Router()

  Event = db.models.Event
  EventDate = db.models.EventDate

  if (global.developerMode) {
    router.get('/', getAPIdescription)
    router.get('/all', getAllEvents)
  }

  router.post('/', createEvent)
  router.get('/:eventID(\\d+)', getEvent)
  router.delete('/:eventID(\\d+)', destroyEvent)

  return router
}
