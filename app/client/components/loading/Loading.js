import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './Loading.css'

export default function Loading ({ className }) {
  return (
    <div className={classnames(styles.root, className)} />
  )
}
