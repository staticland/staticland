module.exports = {
  name: 'help',
  command: function help (args) {
    console.log('the help')
  },
  options: [
    {
      name: '',
      abbr: '',
      boolean: false,
      default: null,
      help: ''
    }
  ]
}
