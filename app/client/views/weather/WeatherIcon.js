import React, { Component, PropTypes } from 'react'
import invariant from 'invariant'
import Icon from '../../components/icon/Icon'

const ICON_MAP = {
  'sun': ['01d'],
  'moon': ['01n'],
  'cloudy': ['02d'],
  'cloudyMoon': ['02n'],
  'cloud': ['03d', '03n'],
  'clouds': ['04d', '04n'],
  'shower': ['09d', '09n'],
  'rainDay': ['10d'],
  'rainNight': ['10n'],
  'storm': ['11d', '11n'],
  'snowflake': ['13d', '13n'],
  'mist': ['50d', '50n']
}

export default class WeatherIcon extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired
  }

  render () {
    const { type, ...props } = this.props

    const mappedIcon = Object.keys(ICON_MAP).find((icon) => {
      return ICON_MAP[icon].indexOf(type) > -1
    })

    invariant(!!mappedIcon, `Invalid weather icon type: ${type}`)

    return <Icon name={mappedIcon} {...props} />
  }
}
