module.exports = function showTubeStatus (io) {
  return (req, res) => {
    io.emit('SHOW_TUBE_STATUS')
    res.sendStatus(200)
  }
}
