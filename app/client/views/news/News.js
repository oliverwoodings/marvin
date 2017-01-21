import React, { Component } from 'react'
import styles from './News.css'

export default class News extends Component {
  render () {
    return (
      <iframe
        className={styles.root}
        src='https://www.youtube.com/embed/y60wDzZt8yg?rel=0&controls=&showinfo=0&autoplay=1'
        frameBorder='0'
      />
    )
  }
}
