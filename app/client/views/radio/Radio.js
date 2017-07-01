import React, { Component } from 'react'
import Icon from '../../components/icon/Icon'
import Visualiser from '../../components/visualiser/Visualiser'
import playAudioUrl from '../../lib/playAudioUrl'
import styles from './Radio.css'

// http://www.suppertime.co.uk/blogmywiki/2015/04/updated-list-of-bbc-network-radio-urls/
const stations = {
  'radio-1': {
    url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p',
    logo: '/images/logo-bbc-radio-1.png'
  },
  'radio-2': {
    url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio2_mf_p',
    logo: '/images/logo-bbc-radio-2.png'
  },
  'radio-3': {
    url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio3_mf_p',
    logo: '/images/logo-bbc-radio-3.png',
  },
  'radio-4': {
    url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio4fm_mf_p',
    logo: '/images/logo-bbc-radio-4.png'
  },
  'absolute-radio': {
    url: 'http://icy-e-bab-04-cr.sharp-stream.com/absoluteradio.mp3',
    logo: '/images/logo-absolute-radio.png'
  },
  'jazz-fm': {
    url: 'http://adsi-e-02-boh.sharp-stream.com/jazzfmmobile.mp3',
    logo: '/images/logo-jazz-fm.png'
  }
}

export default class Radio extends Component {
  state = {
    data: []
  }

  componentDidMount () {
    this.startRadio()
  }

  componentDidUpdate (oldProps) {
    if (oldProps.params.station !== this.props.params.station) {
      this.startRadio()
    }
  }

  componentWillUnmount () {
    this.stopRadio()
  }

  render () {
    const station = this.getStation()
    if (!station) {
      return (
        <div>
          I don't know how to play {this.props.params.station} :(
        </div>
      )
    }

    return (
      <div className={styles.root}>
        <Visualiser data={this.state.data} logo={station.logo} />
      </div>
    )
  }

  startRadio () {
    this.stopRadio()
    const station = this.getStation()
    if (station) {
      this._stop = playAudioUrl(station.url, ::this.updateAudioData)
    }
  }

  stopRadio () {
    if (this._stop) {
      this._stop()
      this._stop = null
      this.setState({
        data: []
      })
    }
  }

  updateAudioData (data) {
    this.setState({ data })
  }

  getStation () {
    return stations[this.props.params.station]
  }
}
