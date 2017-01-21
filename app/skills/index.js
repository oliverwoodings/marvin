var handlers = require('./handlers')
var Alexa = require('alexa-sdk')

module.exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context)
  alexa.registerHandlers(handlers)
  alexa.execute()
}
