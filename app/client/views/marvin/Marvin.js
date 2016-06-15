import React from 'react'
import { compose, pure } from 'recompose'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Icon from '../../components/icon/Icon'
import styles from './Marvin.css'

function mapStateToProps ({ marvin }) {
  return {
    active: marvin.get('active'),
    questioning: marvin.get('questioning'),
    speaking: marvin.get('speaking')
  }
}

function Marvin ({ active, questioning, speaking }) {
  const classes = classnames(styles.root, {
    [styles.active]: active,
    [styles.pulse]: questioning && !speaking
  })

  return <Icon name='marvinHead' className={classes} />
}

export default compose(connect(mapStateToProps), pure)(Marvin)
