'use strict';

var GithubApi = require('github')
var repos = require('./lib/repos')
var events = require('./lib/events')
var pullRequests = require('./lib/pull-requests')

module.exports = function githubStatusReport(user, callback) {
  var github = new GithubApi({
    version: '3.0.0'
  })

  github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_PERSONAL_TOKEN
  })

  var options = {
    github: github,
    user: user,
    per_page: 100
  }

  var data = {}

  repos(options, function(err, repos) {
    pullRequests(repos, options, function(err, pullRequests) {
      data.pullRequests = pullRequests

      events(options, function(err, events) {
        data.events = events
        callback(err, data)
      })
    })
  })
}
