var prompt = require('prompt')

var addhttps = require('../lib/add-https')
var config = require('../lib/config')()
var error = require('../lib/error')

module.exports = {
  name: 'login',
  command: function login (args) {
    args.server = addhttps(args.server || 'https://api.static.land')
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
      login(args)
    })

    function login (args) {
      api.login(args, function (err, res, body) {
        if (err) return error(err.message)
        body.server = args.server
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
