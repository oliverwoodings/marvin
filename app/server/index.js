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

const app = express()
const server = createServer(app);
const io = createSocketIO(server)

io.use(ioWildcard())
io.use(socketLogger)
io.on('connection', (socket) => {
  addSocketHandlers(socket)
})

const dist = join(__dirname, '..', '..', 'dist')
const env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  hotLoad(app)
}

app.use('/', express.static(dist))

server.listen(config.port, () => {
  log.info(`Marvin started (http://localhost:${config.port})`)
})
