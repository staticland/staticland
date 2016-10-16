var pkg = require('../package.json')
var help = require('./help')

module.exports = {
  command: function (args) {
    if (args.version) {
      return console.log(pkg.version)
    } else if (args.help) {
      help.command(args)
    } else {
      help.command(args)
    }
  },
  options: [
    {
      name: 'version',
      abbr: 'v'
    }, {
      name: 'help',
      abbr: 'h',
      boolean: false,
      default: null,
      help: 'Usage information'
    }
  ]
}
