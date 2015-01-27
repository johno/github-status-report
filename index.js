'use strict'

var auth = require('./lib/authenticate');
var repos = require('./lib/repos')
var events = require('./lib/events')
var pullRequests = require('./lib/pull-requests')

module.exports = function githubStatusReport(user, callback) {
  var options = {
    github: auth(),
    user: user,
    per_page: 100
  }

  var data = {}

  repos(options, function(err, repos) {
    data.repos = repos

    pullRequests(repos, options, function(err, pullRequests) {
      data.pullRequests = pullRequests

      events(options, function(err, events) {
        data.events = events

        callback(err, data)
      })
    })
  })
}
