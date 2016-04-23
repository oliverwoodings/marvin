import { combineReducers } from 'redux'
import weather from './weatherReducer'
import forecast from './forecastReducer'
import init from './initReducer'

export default combineReducers({ weather, forecast, init })
