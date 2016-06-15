import log from '../log'
import createHandler from '../lib/createHandler'
import getWitResponse from '../queries/getWitResponse'

export default createHandler('QUESTION', async (socket, { question }) => {
  try {
    socket.emit('QUESTION_RESPONSE', await getWitResponse(question))
  } catch (e) {
    log.error('Unable to respond to question', e)
  }
})
