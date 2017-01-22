import React, { Component } from 'react'
import Icon from '../../components/icon/Icon'
import styles from './Radio.css'

// http://www.suppertime.co.uk/blogmywiki/2015/04/updated-list-of-bbc-network-radio-urls/
const stationUrls = {
  'radio-1': 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p',
  'radio-2': 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio2_mf_p',
  'radio-4': 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio4fm_mf_p'
}

export default class Radio extends Component {
  render () {
    const { station } = this.props.params
    const src = stationUrls[station]

    if (!src) {
      return (
        <div>
          I don't know how to play {station} :(
        </div>
      )
    }

    return (
      <div className={styles.root}>
        <Icon name='radio' className={styles.icon} />
        <audio
          autoPlay
          src={src}
          type='audio/mpeg'
        />
      </div>
    )
  }
}
