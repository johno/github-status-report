'use strict';

var error = require('./errors')

module.exports = function repos(options, callback) {
  var repoOptions = options
  repoOptions.type = repoOptions.type || 'all'

  options.github.repos.getAll(repoOptions, function(err, repoData) {
    if (err) { error(err) }
    callback(err, repoData)
  })
}
