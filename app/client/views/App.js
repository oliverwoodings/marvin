import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from '../components/loading/Loading'
import Icon from '../components/icon/Icon'
import Marvin from './marvin/Marvin'
import Weather from './weather/Weather'
import Clock from './clock/Clock'
import Transport from './transport/Transport'
import styles from './App.css'

function mapStateToProps ({ init }) {
  return {
    initialised: init.get('initialised'),
    authorised: init.get('authorised')
  }
}

class App extends Component {
  render () {
    if (!this.props.authorised) {
      return (
        <div className={styles.root}>
          <Icon name='denied' className={styles.unauthorised} />
        </div>
      )
    }

    if (!this.props.initialised) {
      return (
        <div className={styles.root}>
          <Loading className={styles.loading} />
        </div>
      )
    }

    return (
      <div className={styles.root}>
        <Clock />
        <Weather />
        <Transport />
        <Marvin />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
