module.exports = function reload (io) {
  return (req, res) => {
    io.emit('RELOAD')
    res.sendStatus(200)
  }
}
