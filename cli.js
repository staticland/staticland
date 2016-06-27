#! /usr/bin/env node

var subcommand = require('subcommand')
var config = require('./lib/config')()
config.init()

var match = subcommand({
  root: require('./commands/root'),
  defaults: require('./commands/defaults')(config.read()),
  none: require('./commands/deploy-shorthand'),
  commands: [
    require('./commands/help'),
    require('./commands/config'),
    require('./commands/deploy'),
    require('./commands/login'),
    require('./commands/logout'),
    require('./commands/owner'),
    require('./commands/register'),
    require('./commands/server'),
    require('./commands/whoami')
  ]
})

match(process.argv.slice(2))
