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
  if (/radio (one|1)/.test(mediaType)) return 'radio-1'
  if (/radio (two|2)/.test(mediaType)) return 'radio-2'
  if (/radio (four|4)/.test(mediaType)) return 'radio-4'
}
