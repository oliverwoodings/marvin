import { join } from 'path'
import config from 'config'
import express from 'express'
import bodyParser from 'body-parser'
import createSocketIO from 'socket.io'
import ioWildcard from 'socketio-wildcard'
import { Server as createServer } from 'http'
import hotLoad from './lib/hotLoad'
import log from './log'
import socketLogger from './lib/socketLogger'
import ttsHandler from './handlers/ttsHandler'
import showTubeStatus from './handlers/showTubeStatus'
import playNews from './handlers/playNews'
import stopNews from './handlers/stopNews'
import getEverything from './queries/getEverything'

const app = express()
const server = createServer(app);
const io = createSocketIO(server)

io.use(ioWildcard())
io.use(socketLogger)
io.on('connection', async (socket) => {
  const { query, address } = socket.handshake

  if (query.key === config.auth.key || config.localhost.indexOf(address) >= 0) {
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

app.use(bodyParser.json())
app.use('/', express.static(dist))

app.use('/api', (req, res, next) => {
  if (req.query.key !== config.auth.key) {
    res.sendStatus(401)
  } else {
    next()
  }
})
app.get('/api/tts', ttsHandler)
app.post('/api/show/tube-status', showTubeStatus(io))
app.post('/api/play/news', playNews(io))
app.post('/api/stop/news', stopNews(io))

server.listen(config.port, () => {
  log.info(`Marvin started (http://localhost:${config.port})`)
})
