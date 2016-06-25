#! /usr/bin/env node

var subcommand = require('subcommand')
var help = require('./commands/help')
var config = require('./lib/config')()

config.init()

var match = subcommand({
  root: help,
  none: help.command,
  defaults: require('./commands/defaults')(config.read()),
  commands: [
    help,
    require('./commands/config'),
    require('./commands/deploy'),
    require('./commands/login'),
    require('./commands/logout'),
    require('./commands/owner'),
    require('./commands/whoami')
  ]
})

match(process.argv.slice(2))
