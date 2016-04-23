import log from '../log'

export default function socketLogger (socket, next) {
  next()
  log.debug('Client socket connected')

  socket.on('*', ({ data }) => {
    log.debug(`Received message: ${data[0]}`)
    log.debug(data[1])
  })
}
