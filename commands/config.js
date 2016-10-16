var conf = require('../lib/config')()
var error = require('../lib/error')

module.exports = {
  name: 'config',
  command: function config (args) {
    var action = args._[0]
    var key = args._[1]
    var value = args._[2]

    if (!key) {
      return error('key is required')
    }

    if (action === 'get') {
      conf.get(key)
    } else if (action === 'set') {
      if (!value) {
        return error('value is required')
      }
      conf.set(key, value)
    } else {
      return error('use either `set` or `get`')
    }
  }
}
