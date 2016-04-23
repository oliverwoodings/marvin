import Immutable from 'immutable'
import createReducer from '../lib/createReducer'
import { RECEIVE_INIT } from '../constants'

export default createReducer(Immutable.Map({ initialised: false }), {
  [RECEIVE_INIT]: setInitialised
})

function setInitialised (state) {
  return state.set('initialised', true)
}
