import React, { Component } from 'react'
import _ from 'lodash'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Icon from '../../components/icon/Icon'
import styles from './TrainStatus.css'

function mapStateToProps ({ transport }) {
  return {
    disrupted: transport.getIn(['train', 'disrupted']),
    disruptions: transport.getIn(['train', 'disruptions'])
  }
}

class TrainStatus extends Component {
  render () {
    const { disrupted, disruptions } = this.props

    if (!disrupted) {
      return (
        <div className={classnames(styles.root, styles.noDisruptions)}>
          There are no disruptions to the trains :)
        </div>
      )
    }

    return (
      <div className={styles.root}>
        {disruptions.map(::this.renderDisruption)}
      </div>
    )
  }

  renderDisruption (disruption, index) {
    const reason = disruption
      .get('delayedTrains')
      .map((train) => train.get('delayReason'))
      .get(0)

    return (
      <div className={styles.disruption} key={`disruption-${index}`}>
        <div className={styles.title}>
          {disruption.get('filterLocationName')} &rarr; {disruption.get('locationName')}
        </div>
        <div className={styles.description}>
          Delays of around {disruption.get('totalDelayMinutes')} minutes affecting {disruption.get('totalTrainsDelayed')} trains.&nbsp;
          {reason || 'No reason has been given for the delay.'}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(TrainStatus)
