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
  },
  {
    name: 'exclude',
    abbr: 'e',
    boolean: false,
    help: 'list of files and directories you want to exclude from the deployment'
  }]
}
