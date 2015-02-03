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
    comments: commentEventsReport(events),
    issues: issuesReport(events)
  }
}

function commentEventsReport(events) {
  var resultsByRepo = {}

  events.filter(function(event) {
    return event.type === 'IssueCommentEvent' ||
           event.type === 'CommitCommentEvent' ||
           event.type === 'PullRequestReviewCommentEvent'
  }).forEach(function(comment) {
    resultsByRepo[comment.repo.id] = resultsByRepo[comment.repo.id] || []
    resultsByRepo[comment.repo.id].push(comment)
  })

  return resultsByRepo
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
