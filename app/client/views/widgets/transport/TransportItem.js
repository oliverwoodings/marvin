import React from 'react'
import Icon from '../../../components/icon/Icon'
import styles from './TransportItem.css'

export default function TransportItem ({ disrupted, type }) {
  return (
    <div className={styles.root}>
      <Icon name={type} className={styles.type} />
      <Icon
        name={disrupted ? 'warning' : 'tick'}
        className={disrupted ? styles.disrupted : null}
      />
    </div>
  )
}
