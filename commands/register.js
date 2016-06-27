var addhttps = require('../lib/add-https')
var config = require('../lib/config')()
var error = require('../lib/error')

module.exports = {
  name: 'register',
  command: function login (args) {
    if (!args.email) error('email is required')
    var server = args.server || 'https://api.static.land'
    server = addhttps(server)
    var api = require('../index')(args)

    api.register(args, function (err, res, body) {
      if (err) return error(err.message)
      body.server = server
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
