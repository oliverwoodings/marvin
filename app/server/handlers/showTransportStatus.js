module.exports = function showTransportStatus (io) {
  return (req, res) => {
    const transport = normaliseTransport(req.body.transport)
    if (transport) {
      io.emit('SHOW_TRANSPORT_STATUS', { transport })
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  }
}

function normaliseTransport (transport) {
  if (/(train|overground|rail)/.test(transport)) return 'train'
  if (transport.includes('bus')) return 'bus'
  if (/(tube|bus|under ?ground)/.test(transport)) return 'tube'
}
