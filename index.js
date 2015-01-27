'use strict';

var GithubApi = require('github')
var events = require('./lib/events')

module.exports = function githubStatusReport(user, callback) {
  var github = new GithubApi({
    version: '3.0.0'
  })

  var options = {
    github: github,
    user: user
  }

  events(options, function(err, events) {
    callback(err, events)
  })
}
