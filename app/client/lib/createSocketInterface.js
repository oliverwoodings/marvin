export default function createSocketInterface (socket) {
  return (store) => (next) => (action) => {
    const match = action.type.match(/^SEND_(.+)/)
    if (match) {
      socket.emit(match[1], action.payload)
    }

    return next(action)
  }
}