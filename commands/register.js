var prompt = require('prompt')

var addhttps = require('../lib/add-https')
var config = require('../lib/config')()
var error = require('../lib/error')

module.exports = {
  name: 'register',
  command: function login (args) {
    var server = args.server || 'https://api.static.land'
    server = addhttps(server)
    var api = require('../index')(args)
    var opts = []

    if (!args.username) {
      opts.push({
        name: 'email',
        required: true
      })
    }

    opts.push({
      name: 'password',
      required: true,
      hidden: true,
      replace: '*'
    })

    prompt.message = ''
    prompt.colors = false
    prompt.start()

    prompt.get(opts, function (err, results) {
      if (err) return error(err.message)
      args.email = args.email || results.email
      args.password = args.password || results.password
      register(args)
    })

    function register (args) {
      api.register(args, function (err, res, body) {
        if (err) return error(body.message)
        body.server = server
        body.email = args.email
        config.setLogin(body)
      })
    }
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
