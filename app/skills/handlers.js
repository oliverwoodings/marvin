var axios = require('axios')

var NGROK_ID = process.env.NGROK_ID
var MARVIN_AUTH_KEY = process.env.MARVIN_AUTH_KEY || ''

module.exports = {
  ShowTubeStatus: function () {
    var line = this.event.request.intent.slots.Line.value
    request(this, 'show/tube-status', { line: line }, {
      200: 'OK, I\'ve asked marvin to show you the status of the ' + line,
      404: 'Marvin doesn\'t know what line that is'
    })
  },
  PlayTheNews: function () {
    request(this, 'play/news', {}, {
      200: 'OK, I\'ve asked marvin put the news on for you'
    })
  },
  StopTheNews: function () {
    request(this, 'stop/news', {}, {
      200: 'OK, I\'ve asked marvin to turn the news off'
    })
  }
}

function request (handler, route, data, responses) {
  var url = makeUrl(route)
  console.log('Making request to ' + url)
  axios.post(url, data).then(onSuccess, onFailure)

  function onSuccess () {
    console.log('Request OK')
    if (responses[200]) {
      handler.emit(':tell', responses[200])
    }
  }

  function onFailure (e) {
    console.error('Request failed:', e.message)
    if (e.response) {
      var status = e.response.status
      handler.emit(':tell', responses[status] || 'Marvin responded with unhandled status code ' + status)
    } else {
      console.error(e)
      handler.emit(':tell', 'Something went wrong with marvin, you might want to check he is ok')
    }
  }
}

function makeUrl (route) {
  var base = 'http://marvin.owoodings.net'
  if (NGROK_ID) {
    base = 'http://' + NGROK_ID + '.ngrok.io'
  }
  return base + '/api/' + route + '/?key=' + MARVIN_AUTH_KEY
}
