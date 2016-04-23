import React from 'react'
import ForecastItem from './ForecastItem'
import styles from './Forecast.css'

export default function Forecast ({ forecast }) {
  return (
    <div className={styles.root}>
      {forecast.map(renderForecastItem)}
    </div>
  )
}

function renderForecastItem (item, index) {
  return <ForecastItem key={`forecast-${index}`} {...item.toJS()} />
}
