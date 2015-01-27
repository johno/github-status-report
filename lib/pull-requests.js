'use strict';

var td = require('t-d')
var error = require('./errors')

module.exports = function pullRequests(repos, options, callback) {
  options = options || {}
  options.page = options.page || 1
  options.per_page = options.per_page || 100

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
