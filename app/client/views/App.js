import React, { Component } from 'react'
import { connect } from 'react-redux'
import Marvin from './marvin/Marvin'
import Weather from './weather/Weather'
import Clock from './clock/Clock'
import styles from './App.css'

function mapStateToProps ({ init }) {
  return {
    initialised: init.get('initialised')
  }
}

class App extends Component {
  render () {
    if (!this.props.initialised) {
      return null
    }

    return (
      <div className={styles.root}>
        <Clock />
        <Weather />
        <Marvin />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
