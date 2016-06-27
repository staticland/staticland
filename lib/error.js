var exit = require('exit')

module.exports = function (message, example) {
  console.log(`
  ${errorMessage(message)}
  ${exampleMessage(example)}
  `)
  exit(1)
}

function errorMessage(text) {
  var msg = !text ? null : `
  Error:
    ${text}
  `
  return msg
}

function exampleMessage (text) {
  var msg = !text ? '' : `
  Example:
    ${text}
  `
  return msg
}
