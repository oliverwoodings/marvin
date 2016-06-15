import Immutable from 'immutable'
import createReducer from '../lib/createReducer'
import {
  HEY_MARVIN,
  SEND_QUESTION,
  RECEIVE_QUESTION_RESPONSE,
  HEY_MARVIN_TIMEOUT,
  RECEIVED_SPEECH,
  START_SPEAKING,
  STOP_SPEAKING,
  PROCESS_QUESTION_RESPONSE_FINISHED
} from '../constants'

function getInitialState () {
  return Immutable.Map({
    active: false,
    listening: false,
    questioning: false,
    activationIndex: null,
    speaking: false
  })
}

export default createReducer(getInitialState(), {
  [HEY_MARVIN]: activate,
  [RECEIVED_SPEECH]: setListening,
  [SEND_QUESTION]: setQuestioning,
  [PROCESS_QUESTION_RESPONSE_FINISHED]: getInitialState,
  [HEY_MARVIN_TIMEOUT]: marvinTimeout,
  [START_SPEAKING]: setSpeaking(true),
  [STOP_SPEAKING]: setSpeaking(false)
})

function activate (state, { activationIndex }) {
  return state.merge({
    active: true,
    activationIndex
  })
}

function setSpeaking (value) {
  return (state) => {
    return state.set('speaking', value)
  }
}

function setListening (state) {
  return state.set('listening', true)
}

function setQuestioning (state) {
  return state.set('questioning', true)
}

function marvinTimeout (state, { activationIndex }) {
  if (state.get('questioning') ||
    state.get('speaking') ||
    state.get('listening') ||
    state.get('activationIndex') !== activationIndex) {
    return state
  } else {
    return state.set('active', false)
  }
}
