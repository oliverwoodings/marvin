import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Loading from '../components/loading/Loading'
import Icon from '../components/icon/Icon'
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
    const isFullscreen = document.fullscreenEnabled || document.webkitFullscreenEnabled

    const classes = classnames(styles.root, {
      [styles.fullscreen]: isFullscreen
    })

    if (!this.props.authorised) {
      return (
        <div className={classes}>
          <Icon name='denied' className={styles.unauthorised} />
        </div>
      )
    }

    if (!this.props.initialised) {
      return (
        <div className={classes}>
          <Loading className={styles.loading} />
        </div>
      )
    }

    return (
      <div className={classes}>
        <Clock />
        <Weather />
        <Transport />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
