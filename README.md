# github-status-report

[![Build Status](https://secure.travis-ci.org/johnotander/github-status-report.png?branch=master)](https://travis-ci.org/johnotander/github-status-report)

_Currently under development._

Generate a status report from your Github activity, because lazy.

## Installation

```bash
npm install --save github-status-report
```

## Usage

This requires you to get an [OAUTH token](https://github.com/settings/tokens/new),
and then export it as an environment variable:

```bash
export GITHUB_PERSONAL_TOKEN=my-magic-token
```

Once an OAUTH token is added as an environment variable, you're ready to go:

```javascript
var githubStatusReport = require('github-status-report')

githubStatusReport('johnotander', function(err, data) {
  if (err) {
    console.log('oh noes!: ' + err)
  }

  console.log(data)
})
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
