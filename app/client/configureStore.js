import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import createSocketInterface from './lib/createSocketInterface'
import { SEND_INIT } from './constants'
import { receiveMessage } from './actions/socketActions'

export default function configureStore (socket, router) {
  const middleware = [
    thunk,
    createSocketInterface(socket),
    createLogger()
  ]

  function getDevToolsExtension () {
    if (window.devToolsExtension) {
      return window.devToolsExtension()
    } else {
      return (f) => f
    }
  }

  const store = createStore(
    rootReducer,
    undefined,
    compose(applyMiddleware(...middleware), getDevToolsExtension())
  )

  socket.on('*', (payload) => {
    store.dispatch(receiveMessage(payload, router))
  })

  return store
}
