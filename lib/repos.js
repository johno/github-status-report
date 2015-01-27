'use strict';

var error = require('./errors')

module.exports = function repos(options, callback) {
  options = options || {}
  options.page = options.page || 1
  options.per_page = options.per_page || 100
  options.type = options.type || 'all'

  options.github.repos.getAll(options, function(err, repoData) {
    if (err) { error(err) }
    callback(err, repoData)
  })
}
