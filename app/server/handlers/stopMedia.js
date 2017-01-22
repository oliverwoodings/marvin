module.exports = function stopNews (io) {
  return (req, res) => {
    io.emit('STOP_MEDIA')
    res.sendStatus(200)
  }
}
