var conf = require('../lib/config')()

module.exports = {
  name: 'config',
  command: function config (args) {
    var action = args._[0]
    var key = args._[1]
    var value = args._[2]

    if (!key || !value) {
      return error(msg)
    }

    if (action === 'get') {

    } else if (action === 'set') {

    } else {
      return error('use either `set` or `get`')
    }
  }
}
