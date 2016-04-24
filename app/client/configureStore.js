import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import createSocketInterface from './lib/createSocketInterface'
import { SEND_INIT } from './constants'
import { receiveMessage } from './actions/socketActions'

export default function configureStore (socket) {
  const middleware = applyMiddleware(
    thunk,
    createSocketInterface(socket),
    createLogger()
  )

  const store = createStore(rootReducer, middleware)
  socket.on('*', (payload) => {
    store.dispatch(receiveMessage(payload))
  })

  socket.on('connect', () => {
    store.dispatch({ type: SEND_INIT })
  })

  return store
}
