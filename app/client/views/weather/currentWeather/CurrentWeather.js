import React, { Component } from 'react'
import WeatherIcon from '../WeatherIcon'
import styles from './CurrentWeather.css'

export default function CurrentWeather ({ type, temp }) {
  return (
    <div className={styles.root}>
      <WeatherIcon type={type} className={styles.icon} />
      <div className={styles.temp}>{temp}°</div>
    </div>
  )
}
