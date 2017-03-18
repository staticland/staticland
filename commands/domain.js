var url = require('url')
var dns = require('dns')
var exit = require('exit')
var error = require('../lib/error')

module.exports = {
  name: 'domain',
  command: function logout (args) {
    var hostname = args._[0]
    var server = url.parse(args.server)

    if (!hostname) {
      return error('hostname is required')
    }

    getIP(hostname, function (err, domainIP) {
      if (err) return error(err.message)

      getIP(server.hostname, function (err, serverIP) {
        if (err) return error(err.message)
        if (domainIP === serverIP) {
          ready({
            hostname: hostname,
            serverHostname: server.hostname,
            domainIP: domainIP
          })
        } else {
          notReady({
            serverHostname: server.hostname,
            domainIP: domainIP
          })
        }
      })
    })
  },
  options: []
}

function ready (opts) {
  console.log(`
  SUCCESS!
    Domain ${opts.hostname} ready to deploy to ${opts.serverHostname} at IP ${opts.domainIP}.
  `)
}

function notReady (opts) {
  console.log(`
  FAILED!
    Domain not ready to deploy to ${opts.serverHostname}. Currently at IP ${opts.domainIP}.
  `)
  exit(75)
}

function getIP (hostname, callback) {
  dns.lookup(hostname, function (err, address, family) {
    if (err) return error('hostname IP address not found')
    callback(null, address)
  })
}
