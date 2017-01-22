import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Loading from '../components/loading/Loading'
import Icon from '../components/icon/Icon'
import Weather from './widgets/weather/Weather'
import Clock from './widgets/clock/Clock'
import Transport from './widgets/transport/Transport'
import styles from './App.css'

function mapStateToProps ({ init }) {
  return {
    initialised: init.get('initialised'),
    authorised: init.get('authorised')
  }
}

class App extends Component {
  render () {
    const { authorised, initialised, children } = this.props
    const isFullscreen = document.fullscreenEnabled || document.webkitFullscreenEnabled

    const classes = classnames(styles.root, {
      [styles.fullscreen]: isFullscreen
    })

    if (!authorised) {
      return (
        <div className={classes}>
          <Icon name='denied' className={styles.unauthorised} />
        </div>
      )
    }

    if (!initialised) {
      return (
        <div className={classes}>
          <Loading className={styles.loading} />
        </div>
      )
    }

    return (
      <div className={classes}>
        <div className={styles.top}>
          <Clock />
          <Weather />
        </div>
        <div className={styles.middle}>
          {children || <Icon name='marvinHead' className={styles.marvin} />}
        </div>
        <div className={styles.bottom}>
          <Transport />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
