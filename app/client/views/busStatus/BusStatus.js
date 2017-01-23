import React, { Component } from 'react'
import _ from 'lodash'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Icon from '../../components/icon/Icon'
import styles from './BusStatus.css'

function mapStateToProps ({ transport }) {
  return {
    disrupted: transport.getIn(['bus', 'disrupted']),
    disruptions: transport.getIn(['bus', 'disruptions'])
  }
}

class BusStatus extends Component {
  render () {
    const { disrupted, disruptions } = this.props

    if (!disrupted) {
      return (
        <div className={classnames(styles.root, styles.noDisruptions)}>
          There are no disruptions to the buses :)
        </div>
      )
    }

    const descriptions = disruptions.map((disruption) => disruption.get('description')).toSet()

    return (
      <div className={styles.root}>
        {descriptions.map(::this.renderDisruption)}
      </div>
    )
  }

  renderDisruption (disruption, index) {
    return (
      <div className={styles.disruption} key={`disruption-${index}`}>
        {disruption}
      </div>
    )
  }
}

export default connect(mapStateToProps)(BusStatus)
