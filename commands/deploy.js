var tar = require('tar-fs')
var ignore = require('ignore-file')

var staticland = require('../index')
var addhttps = require('../lib/add-https')
var config = require('../lib/config')()
var error = require('../lib/error')

var ignoreList = `
.git
node_modules
`

module.exports = {
  name: 'deploy',
  command: function deploy (args) {
    var login = config.getLogin()
    var server = addhttps(args.server || login.server)
    var api = staticland({ server: server })
    var token = login.token

    if (args.exclude) {
      args.exclude = typeof args.exclude === 'string' ? args.exclude : args.exclude.join('\n')
      ignoreList = ignoreList.concat(args.exclude)
    }

    var filter = ignore.compile(ignoreList)

    args.path = args._[0]
    args.domain = args._[1]

    var tarstream = tar.pack(args.path, { ignore: filter })
    var headers = { domain: args.domain, authorization: `Bearer ${token}` }

    api.deploy(tarstream, headers, function (err, res, body) {
      if (err && err.message === 'socket hang up') {}
      else if (err) return error(err.message)

      // TODO: show progress/completion
      console.log('domain ' + body.site.domain + ' successfully deployed')
    })
  },
  options: [
    {
      name: 'exclude',
      abbr: 'e',
      boolean: false,
      help: 'list of files and directories you want to exclude from the deployment'
    }
  ]
}
