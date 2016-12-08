var req = require('request')

module.exports = function staticlandAPIClient (config) {
  var client = {}
  client.server = config.server || 'https://api.static.land'

  client.deploy = function (tarstream, headers, callback) {
    var opts = { url: client.server + '/sites', headers: headers, method: 'POST' }
    var stream = request(opts, function (err, res, body) {
      if (err) return callback(err, res, body)
      callback(null, res, body)
    })
    tarstream.pipe(stream)
  }

  client.register = function (opts, callback) {
    if (!opts.password) return callback(new Error('password property is required'))
    if (!opts.email) return callback(new Error('email property is required'))

    return request({
      method: 'POST',
      url: client.server + '/auth',
      json: {
        email: opts.email,
        password: opts.password
      }
    }, callback)
  }

  client.login = function (opts, callback) {
    if (!opts.email) return callback(new Error('email property is required'))

    return request({
      method: 'POST',
      url: client.server + '/auth/verify',
      json: {
        email: opts.email,
        password: opts.password
      }
    }, callback)
  }

  client.owner = function (opts, callback) {
    if (!opts.domain) return callback(new Error('domain option is required'))
    if (!opts.email) return callback(new Error('domain email is required'))
    var headers = { authorization: `Bearer ${opts.token}` }

    return request({
      method: 'POST',
      url: client.server + '/sites/' + opts.domain + '/owner',
      headers: headers,
      json: {
        token: opts.token,
        owner: opts.email,
        domain: opts.domain
      }
    }, callback)
  }

  client.password = function (opts, callback) {
    if (!opts.email) return callback(new Error('domain email is required'))
    if (!opts.token) return callback(new Error('domain email is required'))
    if (!opts.currentPassword) return callback(new Error('domain password is required'))
    if (!opts.newPassword) return callback(new Error('domain password is required'))

    return request({
      method: 'POST',
      url: client.server + '/auth/password',
      json: {
        email: opts.email,
        token: opts.token,
        currentPassword: opts.currentPassword,
        newPassword: opts.newPassword
      }
    }, callback)
  }

  function request (opts, callback) {
    return req(opts, function (err, res, body) {
      body = (typeof body === 'string') ? JSON.parse(body || '') : body
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, res, body)
    })
  }

  return client
}
