import React, { Component } from 'react'
import Immutable from 'immutable'
import _ from 'lodash'
import classnames from 'classnames'
import { connect } from 'react-redux'
import ReturnToRoot from '../../components/returnToRoot/ReturnToRoot'
import Icon from '../../components/icon/Icon'
import styles from './TubeStatus.css'

function mapStateToProps ({ transport }) {
  return {
    disrupted: transport.getIn(['tube', 'disrupted']),
    disruptions: transport.getIn(['tube', 'disruptions'])
  }
}

const closureIcons = {
  serviceClosed: 'denied',
  suspended: 'warning',
  partSuspended: 'warning',
  minorDelays: 'warning',
  severeDelays: 'warning'
}

class TubeStatus extends Component {
  render () {
    const { disrupted, disruptions } = this.props

    if (!disrupted) {
      return (
        <div className={classnames(styles.root, styles.noDisruptions)}>
          <ReturnToRoot />
          There are no disruptions on the tube :)
        </div>
      )
    }

    return (
      <div className={styles.root}>
        <ReturnToRoot />
        {disruptions.map(::this.renderDisruption)}
      </div>
    )
  }

  renderDisruption (disruption, index) {
    const [, line, details] = disruption.get('description').match(/^(.+?) Line: (.+)$/)

    return (
      <div className={styles.disruption} key={`${line}-${index}`}>
        <div className={classnames(styles.line, styles[_.camelCase(line)])}>
          <Icon
            name={closureIcons[disruption.get('closureText')]} 
            className={styles.closureIcon}
          />
        </div>
        <div className={styles.description}>
          {details}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(TubeStatus)
