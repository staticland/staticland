module.exports = function defaults (config) {
  var server

  if (config.currentLogin) {
    server = config.currentLogin.server
  } else {
    server = 'https://api.static.land'
  }

  return [{
    name: 'server',
    abbr: 's',
    default: server,
    help: 'The server that will host your site'
  }]
}
