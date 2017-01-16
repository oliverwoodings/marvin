module.exports = function showTubeStatus (io) {
  return (req, res) => {
    const { line } = req.body
    io.emit('SHOW_TUBE_STATUS', { line })
    res.sendStatus(200)
  }
}
