import init from './initHandler'
import question from './questionHandler'

export default function addSocketHandlers (socket) {
  init(socket)
  question(socket)
}
