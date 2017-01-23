import Immutable from 'immutable'
import createReducer from '../lib/createReducer'
import { RECEIVE_INIT } from '../constants'

function getInitialState () {
  return Immutable.fromJS({
    day: null
  })
}

export default createReducer(getInitialState(), {
  [RECEIVE_INIT]: init
})

function init (state, { calendar }) {
  return state.set('day', Immutable.fromJS(calendar))
}
