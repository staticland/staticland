var exit = require('exit')

module.exports = function (msg) {
  console.log(`
  Error:
    ${msg}
  `)
  exit(1)
}
