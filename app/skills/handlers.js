var axios = require('axios')

var NGROK_ID = process.env.NGROK_ID
var MARVIN_AUTH_KEY = process.env.MARVIN_AUTH_KEY || ''

var defaultResponses = {
  401: 'Marvin says my authentication key is invalid',
  500: 'Marvin might have blown up, I got a 500 status code back'
}

module.exports = {
  ShowTransportStatus: function () {
    var transport = this.event.request.intent.slots.Transport.value
    request(this, 'show/transport-status', { transport: transport }, {
      200: 'OK, I\'ve asked marvin to show you the status of the ' + transport,
      404: 'Marvin doesn\'t know the status of the ' + transport
    })
  },
  Play: function () {
    var mediaType = this.event.request.intent.slots.MediaType.value
    request(this, 'play', { mediaType: mediaType }, {
      200: 'OK, I\'ve asked marvin to put ' + mediaType + ' on for you',
      404: 'Marvin doesn\'t know how to play ' + mediaType
    })
  },
  Stop: function () {
    var mediaType = this.event.request.intent.slots.MediaType.value
    var action = mediaType ? 'turn ' + mediaType + ' off' : 'stop what he\'s doing'
    request(this, 'stop', {
      200: 'OK, I\'ve asked marvin to ' + action
    })
  }
}

function request (handler, route, data, responses) {
  if (!responses) {
    responses = data
    data = {}
  }

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
      var response = responses[status] || defaultResponses[status] || 'Marvin responded with unhandled status code ' + status
      handler.emit(':tell', response)
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
