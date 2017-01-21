module.exports = function stopNews (io) {
  return (req, res) => {
    io.emit('STOP_NEWS')
    res.sendStatus(200)
  }
}
