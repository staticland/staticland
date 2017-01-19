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

  client.sites = function (opts, callback) {
    if (typeof opts === 'function') {
      callback = opts
      opts = {}
    }

    var pathname = opts.owner ? '/sites?owner=' + opts.owner : '/sites'

    return request({
      method: 'GET',
      url: client.server + pathname,
      json: true
    }, callback)
  }

  client.register = function (opts, callback) {
    if (!opts.password) return callback(new Error('password property is required'))
    if (!opts.email) return callback(new Error('email property is required'))

    return request({
      method: 'POST',
      url: client.server + '/accounts/register',
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
      url: client.server + '/accounts/login',
      json: {
        email: opts.email,
        password: opts.password
      }
    }, callback)
  }

  client.verify = function (opts, callback) {
    if (!opts.token) return callback(new Error('token property is required'))
    var headers = { authorization: `Bearer ${opts.token}` }

    return request({
      method: 'POST',
      url: client.server + '/accounts/verify',
      headers: headers,
      json: true
    }, callback)
  }

  client.logout = function (opts, callback) {
    if (!opts.token) return callback(new Error('token property is required'))
    var headers = { authorization: `Bearer ${opts.token}` }

    return request({
      method: 'POST',
      url: client.server + '/accounts/logout',
      headers: headers,
      json: true
    }, callback)
  }

  client.destroyAccount = function (opts, callback) {
    if (!opts.token) return callback(new Error('token property is required'))
    var headers = { authorization: `Bearer ${opts.token}` }

    return request({
      method: 'POST',
      headers: headers,
      url: client.server + '/accounts/destroy'
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

  client.resetPassword = function (opts, callback) {
    if (!opts.email) return callback(new Error('email property is required'))

    return request({
      url: client.server + '/accounts/password-reset/' + opts.email,
      json: true,
      method: 'POST' }, callback)
  }

  client.resetPasswordConfirmation = function (opts, callback) {
    if (!opts.accountKey) return callback(new Error('accountKey property is required'))
    if (!opts.resetToken) return callback(new Error('resetToken property is required'))
    if (!opts.email) return callback(new Error('email property is required'))
    if (!opts.newPassword) return callback(new Error('newPassword property is required'))

    return request({
      url: client.server + '/accounts/password-reset-confirm/',
      json: true,
      body: opts,
      method: 'POST'
    }, callback)
  }

  function request (opts, callback) {
    return req(opts, function (err, res, body) {
      body = (typeof body === 'string' && body.length) ? JSON.parse(body || '') : body

      if (err) {
        return callback(err)
      } else if (typeof body === 'string' && !body.length) {
        return callback(new Error('Authorization failed'))
      } else if (res.statusCode >= 400) {
        return callback(body)
      } else {
        return callback(null, res, body)
      }
    })
  }

  return client
}
