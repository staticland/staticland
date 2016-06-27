var fs = require('fs')
var path = require('path')
var homedir = require('os-homedir')
var isNumber = require('is-number')
var isString = require('is-string')

module.exports = function (opts) {
  opts = opts || {}
  var config = {}
  config.filename = opts.filename || '.staticlandrc'
  config.filepath = opts.filepath || path.join(homedir(), config.filename)

  config.init = function () {
    if (config.read()) {
      return
    } else {
      config.write({
        currentLogin: null,
        logins: []
      })
    }
  }

  config.read = function () {
    var file

    try {
      file = fs.readFileSync(config.filepath, 'utf8')
    } catch (err) {
      // file not found
    }

    if (!file || typeof file === 'error') return false
    return JSON.parse(file)
  }

  config.write = function (data) {
    var file = JSON.stringify(data, true, 2)
    fs.writeFileSync(config.filepath, file)
  }

  config.get = function (key) {
    var data = config.read()
    if (!key) return data
    var keys = parseKeys(key)
    var current = keys[0]
    if (keys.length === 1) return data[current]
    return get(data[current], keys.slice(1))
  }

  config.set = function (key, value) {
    var data = config.read()
    var keys = parseKeys(key)
    var current = keys[0]

    if (keys.length === 1) {
      data[current] = value
      config.write(data)
    } else {
      set(data[current], keys.slice(1), value)
    }
  }

  config.getLogin = function (server) {
    var logins = config.get('logins')

    if (!server) {
      return config.get('currentLogin')
    }

    var login = logins.find(function (item) {
      if (item === null) return
      return item.server === server
    })

    if (!login) return false
    login.server = server
    return login
  }

  config.setLogin = function (opts) {
    var logins = config.get('logins')
    var found = false

    logins = logins.map(function (login) {
      if (login === null) return
      if (login.server === opts.server) {
        found = true
        return opts
      }
    })

    if (!found) {
      logins.push(opts)
    }

    config.set('logins', logins)
    config.set('currentLogin', opts)
  }

  function parseKeys (key) {
    if (isString(key)) {
      var keys = key.split('.').map(function (key) {
        if (isNumber(key)) return parseInt(key)
        return key
      });
      return keys
    }
    else return key
  }

  return config
}
