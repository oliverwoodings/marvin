import Immutable from 'immutable'
import createReducer from '../lib/createReducer'
import { RECEIVE_INIT } from '../constants'

export default createReducer(Immutable.Map({
  initialised: false,
  gitHash: null
}), {
  [RECEIVE_INIT]: setInitialised
})

function setInitialised (state, payload) {
  return state.merge({
    initialised: true,
    gitHash: payload.gitHash || state.get('gitHash')
  })
}
