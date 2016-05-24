var config = require('../lib/config')()
var error = require('../lib/error')

module.exports = {
  name: 'login',
  command: function login (args) {
    if (!args.email) error('email is required')
    if (!args.password) error('password is required')
    args.server = args.server || 'https://api.static.land'
    var api = require('../index')(args)

    api.login(args, function (err, res, body) {
      if (err) return error(err.message)
      body.server = args.server
      body.email = args.email
      config.setLogin(body)
    })
  },
  options: [
    {
      name: 'email',
      abbr: 'e',
      boolean: false,
      default: null,
      help: 'Your email address'
    },
    {
      name: 'password',
      abbr: 'p',
      boolean: false,
      default: null,
      help: 'Your password'
    }
  ]
}
