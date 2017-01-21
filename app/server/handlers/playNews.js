module.exports = function playNews (io) {
  return (req, res) => {
    io.emit('PLAY_NEWS')
    res.sendStatus(200)
  }
}
