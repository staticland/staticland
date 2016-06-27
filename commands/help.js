var usage = `
  USAGE:
    staticland {command} [options]

  COMMANDS:
    register,  create an account on a staticland server
    login,     log in to a staticland server
    logout,    log out of a staticland server
    deploy,    deploy a static site to a staticland server
    password,  change your password on a staticland server
    server,    switch between staticland servers you've logged in to
    whoami,    show which user you're using on which staticland server
    help,      show this help message

  DEPLOY
    staticland deploy --path site/ --domain example.com --server api.static.land

  HELP
    staticland help

  LOGIN
    staticland login --email hi@example.com --password sosecret --server api.static.land

  SERVER
    staticland server api.static.land

  WHOAMI
    staticland whoami
`

module.exports = {
  name: 'help',
  command: function help (args, a, b, c) {
    console.log(usage)
  }
}
