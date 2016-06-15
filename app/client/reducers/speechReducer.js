import Immutable from 'immutable'
import createReducer from '../lib/createReducer'
import {
  RECEIVED_SPEECH,
  RECEIVE_SPEECH_RECOGNITION,
  HEY_MARVIN
} from '../constants'

function getInitialState () {
  return Immutable.Map({
    recognition: null,
    text: ''
  })
}

export default createReducer(getInitialState(), {
  [RECEIVED_SPEECH]: setText,
  [HEY_MARVIN]: resetText,
  [RECEIVE_SPEECH_RECOGNITION]: setSpeechRecognition
})

function resetText (state) {
  return state.set('text', '')
}

function setText (state, { question }) {
  return state.set('text', question)
}

function setSpeechRecognition (state, { recognition }) {
  return state.set('recognition', recognition)
}
