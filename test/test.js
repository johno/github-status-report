var assert = require('assert');
var githubStatusReport = require('..');

describe('github-status-report', function() {

  it('should do something awesome', function(done) {
    this.timeout(60000);
    githubStatusReport('johnotander', function(err, data) {
      console.log(JSON.stringify(data, undefined, 2))
      assert.ok(!err)
      assert.ok(data)
    })
  })
})
