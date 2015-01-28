'use strict'

var isBlank = require('is-blank')

module.exports = function eventsReport(events) {
  if (isBlank(events)) {
    return
  }

  var byType = {}
  var byRepo = {}

  events.forEach(function(event) {
    byType[event.type] = byType[event.type] || []
    byType[event.type].push(event)

    if (event.repo) {
      byRepo[event.repo.id] = byRepo[event.repo.id] || []
      byRepo[event.repo.id].push(event)
    }
  })

  return {
    comments: issueCommentEventsReport(events),
    issues: issuesReport(events)
  }
}

function issueCommentEventsReport(events) {
  var byRepo = {}
  var results = []

  events.filter(function(event) {
    return event.type === 'IssueCommentEvent'
  }).forEach(function(issueCommentEvent) {
    byRepo[issueCommentEvent.repo.id] = byRepo[issueCommentEvent.repo.id] || []
    byRepo[issueCommentEvent.repo.id].push(issueCommentEvent)
  })

  Object.keys(byRepo).forEach(function(repo) {
    var eventsList = byRepo[repo]
    var repo = eventsList[0].repo

    results.push({
      repo: repo,
      type: 'comment',
      eventCount: eventsList.length
    })
  })

  return results
}

function issuesReport(events) {
  var byRepo = {}
  var results = {
    created: [],
    closed: []
  }

  events.filter(function(event) {
    return event.type === 'IssuesEvent'
  }).forEach(function(issueEvent) {
    byRepo[issueEvent.repo.id] = byRepo[issueEvent.repo.id] || []
    byRepo[issueEvent.repo.id].push(issueEvent)
  })

  Object.keys(byRepo).forEach(function(repo) {
    var eventsList = byRepo[repo]

    eventsList.forEach(function(event) {
      if (event.payload.action === 'closed') {
        results.closed.push(event)
      } else {
        results.created.push(event)
      }
    })
  })

  return results
}

// push events
// create events
// watch events
// fork events
// pullrequest event
