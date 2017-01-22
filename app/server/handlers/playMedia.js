module.exports = function playNews (io) {
  return (req, res) => {
    const mediaType = normaliseMediaType(req.body.mediaType)

    if (mediaType) {
      io.emit('PLAY_MEDIA', { mediaType })
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  }
}

function normaliseMediaType (mediaType) {
  if (mediaType.includes('news')) return 'news'
  if (/radio (four|4)/) return 'radio-4'
  if (/radio (one|1)/) return 'radio-1'
  if (/radio (two|2)/) return 'radio-2'
}
