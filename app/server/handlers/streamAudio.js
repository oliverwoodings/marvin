const request = require('request')

module.exports = async function streamAudio (req, res, next) {
  const { url } = req.query
  res.setHeader('content-type', 'audio/mpeg')
  request.get(url).pipe(res)
}
