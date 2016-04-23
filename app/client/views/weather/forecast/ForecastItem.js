import React from 'react'
import moment from 'moment'
import WeatherIcon from '../WeatherIcon'
import styles from './ForecastItem.css'

export default function ForecastItem ({ time, temp, type }) {
  const formattedTime = moment(time, 'x').format('HH:mm')
  return (
    <div className={styles.root}>
      <div className={styles.time}>{formattedTime}</div>
      <WeatherIcon type={type} className={styles.icon} />
      <div className={styles.temp}>{temp}°</div>
    </div>
  )
}
