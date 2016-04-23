export default function createHandler (type, handler) {
  return (socket) => {
    socket.on(type, (data) => {
      handler(socket, data)
    })
  }
}
