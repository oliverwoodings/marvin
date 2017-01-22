import React, { Component } from 'react'
import styles from './News.css'

export default class News extends Component {
  render () {
    return (
      <audio autoPlay src='http://video.news.sky.com/snr/news/snrnews.mp3' type='audio/mpeg' />
    )
  }
}
