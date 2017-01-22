var prompt = require('prompt')

var addhttps = require('../lib/add-https')
var error = require('../lib/error')

module.exports = {
  name: 'reset-password',
  command: function login (args) {
    args.server = addhttps(args.server || 'https://api.static.land')
    var api = require('../index')(args)

    function reset (args) {
      api.resetPassword(args, function (err, res, body) {
        if (err) return error(err.message)
        if (body && body.message) console.log(body.message)
      })
    }

    if (args.email) {
      reset(args)
    } else {
      var opts = [{
        name: 'email',
        required: true
      }]

      prompt.message = ''
      prompt.colors = false
      prompt.start()

      prompt.get(opts, function (err, results) {
        if (err) return error(err.message)
        args.email = args.email || results.email
        args.password = args.password || results.password
        reset(args)
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
    }
  ]
}
