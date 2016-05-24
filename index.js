var req = require('request')

module.exports = function staticlandAPIClient (options) {
  var client = {}
  client.server = options.server || 'https://api.static.land'

  client.deploy = function (tarstream, headers, callback) {
    var opts = { url: client.server + '/sites', headers: headers, method: 'POST' }
    var stream = request(opts, callback)
    tarstream.pipe(stream)
  }

  client.login = function (opts, callback) {
    var baseurl = client.server + '/auth/verify'
    var fullurl = baseurl + '?email=' + opts.email + '&password=' + opts.password
    request({ url: fullurl, json: true, method: 'POST' }, callback)
  }

  client.owner = function (opts, callback) {
    
  }

  function request (opts, callback) {
    return req(opts, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, res, body)
    })
  }

  return client
}
