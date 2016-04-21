import createReducer from '../lib/createReducer'

export default createReducer({}, {
  FOO: bar
})

function bar (state, payload) {
  return state
}
