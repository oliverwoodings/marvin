import { combineReducers } from 'redux'
import weather from './weatherReducer'
import forecast from './forecastReducer'
import init from './initReducer'
import transport from './transportReducer'
import marvin from './marvinReducer'

export default combineReducers({ weather, forecast, init, transport, marvin })
