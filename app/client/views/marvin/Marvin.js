import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Icon from '../../components/icon/Icon'
import styles from './Marvin.css'

function mapStateToProps ({ marvin }) {
  return {
    active: marvin.get('active')
  }
}

class Marvin extends Component {
  render () {
    const { active } = this.props
    const classes = classnames(styles.root, {
      [styles.active]: active
    })

    return <Icon name='marvinHead' className={classes} />
  }
}

export default connect(mapStateToProps)(Marvin)
