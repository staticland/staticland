module.exports = function (server) {
  if (server.indexOf('http') === -1) {
    server = 'https://' + server
  }
  return server
}
