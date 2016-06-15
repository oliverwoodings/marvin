import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import createSocketInterface from './lib/createSocketInterface'
import { SEND_INIT } from './constants'
import { receiveMessage } from './actions/socketActions'
import {
  speechResult,
  recognitionStarted,
  recognitionEnded,
  receiveRecognition
} from './actions/speechActions'

export default function configureStore (socket, recognition) {
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

  store.dispatch(receiveRecognition(recognition))

  recognition.addEventListener('result', (result) => {
    store.dispatch(speechResult(result))
  })

  recognition.addEventListener('start', () => {
    store.dispatch(recognitionStarted())
  })

  recognition.addEventListener('end', () => {
    store.dispatch(recognitionEnded())
  })

  return store
}
