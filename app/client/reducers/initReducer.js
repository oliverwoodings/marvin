import Immutable from 'immutable'
import createReducer from '../lib/createReducer'
import {
  RECEIVE_INIT,
  RECEIVE_UNAUTHORISED
} from '../constants'

export default createReducer(Immutable.Map({
  initialised: false,
  authorised: true,
  gitHash: null
}), {
  [RECEIVE_INIT]: setInitialised,
  [RECEIVE_UNAUTHORISED]: setUnauthorised
})

function setInitialised (state, payload) {
  return state.merge({
    initialised: true,
    gitHash: payload.gitHash || state.get('gitHash')
  })
}

function setUnauthorised (state) {
  return state.set('authorised', false)
}
