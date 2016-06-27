var deploy = require('./deploy')

module.exports = function (args) {
  args.path = args._[0]
  args.domain = args._[1]
  deploy.command(args)
}
