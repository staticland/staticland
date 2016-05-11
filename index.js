var request = require('request')

module.exports = function staticlandClient (options) {
  var client = {}
  client.server = options.server || 'https://api.static.land'

  client.deploy = function staticlandClient_deploy (tarstream, headers, callback) {
    var req = request.post({ url: client.server, headers: headers })

    req.on('error', function (err) {
      callback(err)
    })

    req.on('response', function (response, body) {
      // TODO: log response
    })

    req.on('end', function () {
      callback()
    })

    tarstream.pipe(req)
  }

  return client
}
