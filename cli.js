#! /usr/bin/env node

var fs = require('fs')
var zlib = require('zlib')
var path = require('path')
var minimist = require('minimist')
var tar = require('tar-fs')

var argv = minimist(process.argv.slice(2), {
  alias: {
    s: 'server',
    h: 'help'
  },
  default: {}
})

var usage = `
Usage:
  staticland {sourceDir} {domain}
Options:
  * --server, -s     The server hosting staticland
  * --help, -h       Show this usage info
`

/*
* Get source directory
*/
var cwd = process.cwd()
var source = argv._[0] ? path.resolve(cwd, argv._[0]) : cwd
var domain = argv._[1]

/*
* Show help
*/
if (argv.help) {
  console.log(usage)
  process.exit()
}

/*
* Check for domain
*/
if (!domain) {
  console.log('\nError:\ndomain is required')
  console.log(usage)
  process.exit()
}

/*
* Server
*/
var staticland = require('./index')({
  server: argv.server ? argv.server : 'https://api.static.land'
})

var tarstream = tar.pack(source)
var headers = { domain: domain }

staticland.deploy(tarstream, headers, function (err) {
  if (err) return handleError(err)
  console.log(domain, 'deployed!')
})

function handleError (err) {
  console.log(err)
  process.exit(1)
}
