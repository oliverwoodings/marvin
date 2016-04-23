import React, { Component } from 'react'
import moment from 'moment'
import styles from './Clock.css'

export default class Clock extends Component {
  componentDidMount () {
    this.timer = setInterval(::this.forceUpdate, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const time = moment().format('HH:mm')
    const date = moment().format('dddd Do MMMM')

    return (
      <div className={styles.root}>
        <div className={styles.time}>{time}</div>
        <div className={styles.date}>{date}</div>
      </div>
    )
  }
}
