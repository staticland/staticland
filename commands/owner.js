var addhttps = require('../lib/add-https')
var config = require('../lib/config')()
var error = require('../lib/error')

module.exports = {
  name: 'owner',
  command: function owner (args) {
    if (!args.email) error('email is required')
    if (!args.domain) error('domain is required')
    var server = args.server || 'https://api.static.land'
    args.server = server = addhttps(server)
    var api = require('../index')(args)
    var current = config.get('currentLogin')
    args.token = current.token

    api.owner(args, function (err, res, body) {
      if (err) return error(err.message)
      console.log(body)
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
      name: 'domain',
      abbr: 'd',
      boolean: false,
      help: 'The domain of your site'
    }
  ]
}
