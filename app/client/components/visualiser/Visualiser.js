import React, { PropTypes } from 'react'
import styles from './Visualiser.css'

const Visualiser = ({ data, logo }) => {
  const count = data.length
  const width = 100 // equates to 100vw i.e width of the screen
  const maxDataValue = 256
  const center = width / 2
  const circleMaxWidth = (width * 0.5) >> 0 // decimal controls width of the inner circle
  const radius = circleMaxWidth * 0.2
  const twoPi = 2 * Math.PI
  const change = twoPi / count

  const bars = []
  for (let i = 0; i < count; i++) {
    const rotation = i * change
    const left = (center + radius * Math.cos(rotation)) + 'vw'
    const top = (center + radius * Math.sin(rotation)) + 'vw'
    const height = ((data[i] / maxDataValue) * 47) + 'vw' // 50 controls height ratio of bars
    const transform = `rotate(${(rotation - (Math.PI / 2))}rad)`
    const transformOrigin = '0px 0px'

    bars.push(
      <div
        key={`bar-${i}`}
        className={styles.bar}
        style={{ left, top, transform, transformOrigin, height }}
      />
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.circle}>
        {logo ? <img src={logo} className={styles.logo} /> : null}
      </div>
      {bars}
    </div>
  )
}

export default Visualiser
