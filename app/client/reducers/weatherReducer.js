import Immutable from 'immutable'
import createReducer from '../lib/createReducer'
import { RECEIVE_INIT } from '../constants'

export default createReducer(Immutable.Map(), {
  [RECEIVE_INIT]: init
})

function init (state, { weather }) {
  return state.mergeDeep(weather)
}
