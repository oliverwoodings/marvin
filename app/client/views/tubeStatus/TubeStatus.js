import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './TubeStatus.css'

function mapStateToProps ({ transport }) {
  return {
    transport
  }
}

class TubeStatus extends Component {
  render () {
    const { transport } = this.props

    return (
      <div className={styles.root}>
        Hello wassup
      </div>
    )
  }
}

export default connect(mapStateToProps)(TubeStatus)
