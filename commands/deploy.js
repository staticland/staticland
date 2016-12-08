var path = require('path')
var tar = require('tar-fs')
var ignore = require('ignore-file')

var staticland = require('../index')
var addhttps = require('../lib/add-https')
var config = require('../lib/config')()
var error = require('../lib/error')

module.exports = {
  name: 'deploy',
  command: function deploy (args) {
    var domain = args.domain
    var source = path.join(process.cwd(), args.path)
    var login = config.getLogin()
    var server = addhttps(args.server || login.server)
    var api = staticland({ server: server })
    var token = login.token

    var filter = ignore.compile(`
    .git
    node_modules
    `)

    args.path = args.path || args._[0]
    args.domain = args.domain || args._[1]

    var tarstream = tar.pack(source, { ignore: filter })
    var headers = { domain: domain, authorization: `Bearer ${token}` }

    api.deploy(tarstream, headers, function (err, res, body) {
      if (err) return error(err.message)
      // TODO: show progress/completion
      // body = JSON.parse(body)
    })
  },
  options: [
    {
      name: 'path',
      abbr: 'p',
      boolean: false,
      default: '.',
      help: 'The path to your built static site'
    },
    {
      name: 'domain',
      abbr: 'd',
      boolean: false,
      help: 'The domain of your site. Make sure the DNS already points to the staticland server before deploying if not using a subdomain of the server\'s domain'
    }
  ]
}
