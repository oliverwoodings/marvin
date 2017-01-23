import { join } from 'path'
import config from 'config'
import express from 'express'
import bodyParser from 'body-parser'
import createSocketIO from 'socket.io'
import ioWildcard from 'socketio-wildcard'
import expressLogger from 'express-driftwood'
import { Server as createServer } from 'http'
import hotLoad from './lib/hotLoad'
import log from './log'
import socketLogger from './lib/socketLogger'
import ttsHandler from './handlers/ttsHandler'
import showTransportStatus from './handlers/showTransportStatus'
import playMedia from './handlers/playMedia'
import stopMedia from './handlers/stopMedia'
import streamAudio from './handlers/streamAudio'
import getCalendar from './handlers/getCalendar'
import getEverything from './queries/getEverything'

const app = express()
const server = createServer(app);
const io = createSocketIO(server)


io.use(ioWildcard())
io.use(socketLogger)
io.on('connection', async (socket) => {
  const { query, address } = socket.handshake

  if (query.key === config.auth.key || config.localhost.includes(address)) {
    socket.emit('AUTHORISED')
    socket.emit('INIT', await getEverything())
  } else {
    socket.emit('UNAUTHORISED')
    socket.disconnect()
  }
})

setInterval(async () => {
  io.emit('INIT', await getEverything())
}, config.updateInterval)

const dist = join(__dirname, '..', '..', 'dist')
const env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  hotLoad(app)
}

app.use(expressLogger(log))
app.use(bodyParser.json())
app.use('/', express.static(dist))

app.use('/api', (req, res, next) => {
  const address = req.connection.remoteAddress
  if (req.query.key !== config.auth.key && !config.localhost.includes(address)) {
    res.sendStatus(401)
  } else {
    next()
  }
})
app.get('/api/tts', ttsHandler)
app.post('/api/show/transport-status', showTransportStatus(io))
app.post('/api/play', playMedia(io))
app.post('/api/stop', stopMedia(io))
app.get('/api/stream', streamAudio)
app.get('/api/calendar', getCalendar)

server.listen(config.port, () => {
  log.info(`Marvin started (http://localhost:${config.port})`)
})
