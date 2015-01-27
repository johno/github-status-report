'use strict';

var td = require('t-d')
var isBlank = require('is-blank')
var error = require('./errors')

module.exports = function events(options, callback) {
  var events = {
    all: [],
    watchEvents: [],
    publicEvents: [],
    privateEvents: []
  }

  retrieveEventsData(events, options, function(err, data) {
    callback(err, data)
  })
}

function retrieveEventsData(events, options, callback) {
  options = options || {}
  options.page = options.page || 1
  options.per_page = options.per_page || 100

  var startOfWeek = td().weeks(1).ago()
  options.github.events.getFromUser(options, function(err, eventData) {
    if (err || isBlank(eventData)) {
      error(err)
      callback(err, events)
      return
    }

    eventData.forEach(function(event) {
      var currDate = new Date(event.created_at)
      if (currDate < startOfWeek) {
        callback(null, events)
      }

      event.public ?
        events.publicEvents.push(event) :
        events.privateEvents.push(event)

      events.all.push(event)
    });

    options.page++
    retrieveEventsData(events, options, callback)
  })
}
