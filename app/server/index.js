import { join } from 'path'
import config from 'config'
import express from 'express'
import createSocketIO from 'socket.io'
import ioWildcard from 'socketio-wildcard'
import { Server as createServer } from 'http'
import hotLoad from './lib/hotLoad'
import log from './log'
import socketLogger from './lib/socketLogger'
import addSocketHandlers from './handlers'
import getEverything from './queries/getEverything'

const app = express()
const server = createServer(app);
const io = createSocketIO(server)

io.use(ioWildcard())
io.use(socketLogger)
io.on('connection', (socket) => {
  const { query, address } = socket.handshake

  if (query.key === config.auth.key || config.localhost.indexOf(address) >= 0) {
    socket.emit('AUTHORISED')
    addSocketHandlers(socket)
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

app.use('/', express.static(dist))

server.listen(config.port, () => {
  log.info(`Marvin started (http://localhost:${config.port})`)
})
