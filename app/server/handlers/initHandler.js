import log from '../log'
import createHandler from '../lib/createHandler'
import getEverything from '../queries/getEverything'

export default createHandler('INIT', async (socket) => {
  try {
    socket.emit('INIT', await getEverything())
  } catch (e) {
    log.error('Unable to respond to init', e)
  }
})
