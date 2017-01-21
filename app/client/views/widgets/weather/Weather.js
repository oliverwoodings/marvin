import React, { Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import CurrentWeather from './currentWeather/CurrentWeather'
import Forecast from './forecast/Forecast'
import styles from './Weather.css'

function formatItem (item) {
  return {
    type: item.getIn(['weather', 0, 'icon']),
    temp: Math.round(item.getIn(['main', 'temp'])),
    time: item.get('dt') * 1000
  }
}

function mapStateToProps ({ weather, forecast }) {
  const now = new Date().getTime()
  const forecastItems = forecast
    .get('list')
    .map(formatItem)
    .map((item) => Immutable.Map(item))
    .filter((item) => {
      return item.get('time') >= now
    })
    .slice(0, 4)

  return {
    ...formatItem(weather),
    forecast: forecastItems
  }
}

class Weather extends Component {
  render () {
    const { type, temp, forecast } = this.props

    return (
      <div className={styles.root}>
        <CurrentWeather type={type} temp={temp} />
        <Forecast forecast={forecast} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Weather)
