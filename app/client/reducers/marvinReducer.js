import Immutable from 'immutable'
import createReducer from '../lib/createReducer'

export default createReducer(Immutable.Map({ active: true }), { })
