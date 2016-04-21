import React, { Component } from 'react'
import Icon from '../components/icon/Icon'
import styles from './Marvin.css'

export default class Marvin extends Component {
  render () {
    return <Icon name='robot' className={styles.root} />
  }
}
