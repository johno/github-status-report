'use strict'

var GithubApi = require('github')

module.exports = function authenticate() {
  var github = new GithubApi({
    version: '3.0.0'
  })

  github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_PERSONAL_TOKEN
  })

  return github
}
