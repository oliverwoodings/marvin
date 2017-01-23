const stations = {
  'radio-1': /radio (one|1)/,
  'radio-2': /radio (two|2|too?)/,
  'radio-3': /radio (three|3|tree)/,
  'radio-4': /radio (four|4|for|thor)/,
  'absolute-radio': /absolute? radio/,
  'jazz-fm': /jazz fm/
}

module.exports = function playNews (io) {
  return (req, res) => {
    const mediaType = normaliseMediaType(req.body.mediaType)

    if (mediaType) {
      io.emit('PLAY_MEDIA', mediaType)
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  }
}

function normaliseMediaType (mediaType) {
  if (mediaType.includes('news')) {
    return {
      type: 'news'
    }
  }
  for (let station in stations) {
    if (stations[station].test(mediaType)) {
      return {
        type: 'radio',
        station
      }
    }
  }
}
