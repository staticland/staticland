var addhttps = require('../lib/add-https')
var config = require('../lib/config')()
var error = require('../lib/error')

/**
* Change the default server that `staticland` will deploy to
* @name staticland server
* @example
* staticland server api.static.land
*/
module.exports = {
  name: 'server',
  command: function server (args) {
    var server = args._[0]

    if (!server) {
      return error('server argument required')
    }

    server = addhttps(server)
    var login = config.get(server)

    if (!login) {
      return error('login info for server ', server, 'not found')
    }

    config.set('currentLogin', login)
  }
}
