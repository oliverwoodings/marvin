import React, { Component } from 'react'
import { connect } from 'react-redux'
import TransportItem from './TransportItem'
import styles from './Transport.css'

function mapStateToProps ({ transport }) {
  return {
    transport
  }
}

class Transport extends Component {
  render () {
    const { transport } = this.props
    const items = transport.map((item, type) => {
      return (
        <TransportItem
          key={type}
          disrupted={item.get('disrupted')}
          type={type}
        />
      )
    })

    return (
      <div className={styles.root}>
        {items.toArray()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Transport)
