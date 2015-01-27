'use strict'

var td = require('t-d')
var error = require('./errors')

module.exports = function pullRequests(repos, options, callback) {
  var pullRequests = []
  var repoCount = repos.length

  repos.forEach(function(repo, i) {
    options.repo = repo.id
    options.github.pullRequests.getAll(options, function(err, pullRequestData) {
      pullRequests.concat(pullRequestData || [])

      if (i == repoCount - 1) {
        callback(err, pullRequests)
      }
    })
  })
}
