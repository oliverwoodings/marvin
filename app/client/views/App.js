import React, { Component } from 'react'
import Marvin from './Marvin'
import styles from './App.css'

export default class App extends Component {
  render () {
    return (
      <div className={styles.root}>
        Hi!
        <Marvin />
      </div>
    )
  }
}
