var fs = require('fs')
var zlib = require('zlib')
var path = require('path')
var tar = require('tar-fs')
var exit = require('exit')

var staticland = require('../index')
var config = require('../lib/config')()
var error = require('../lib/error')

module.exports = {
  name: 'deploy',
  command: function deploy (args) {
    var api = staticland({ server: args.server })
    var domain = args.domain
    var source = path.join(process.cwd(), args.source)
    var token = config.getLogin(args.server).token
    var tarstream = tar.pack(source)
    var headers = { domain: domain, authorization: `Bearer ${token}` }

    api.deploy(tarstream, headers, function (err, res, body) {
      if (err) return error(err)
      body = JSON.parse(body)
      if (body.token) {
        // then this was the first deploy, and we need to update the token
        var login = config.get('currentLogin')
        login.token = body.token
        config.setLogin(login)
      }
    })
  },
  options: [
    {
      name: 'source',
      abbr: 's',
      boolean: false,
      default: null,
      help: 'The directory with your built static site'
    },
    {
      name: 'domain',
      abbr: 'd',
      boolean: false,
      help: 'The domain of your site. Make sure the DNS already points to the staticland server before deploying if not using a subdomain of the server\'s domain'
    }
  ]
}
