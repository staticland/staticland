module.exports = function defaults (config) {
  var server
  if (config.currentLogin) {
    server = config.currentLogin.server
  }

  return [{
    name: 'server',
    abbr: 's',
    boolean: false,
    default: server || 'https://api.static.land',
    help: 'The server that will host your site'
  }]
}
