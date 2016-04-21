var winston = require('winston')

var transports = [new (winston.transports.Console)({
  level: 'debug',
  colorize: true,
  timestamp: true,
  prettyPrint: true
})]

module.exports = new winston.Logger({
  transports: process.env.NODE_ENV === 'test' ? [] : transports
})
