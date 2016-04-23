import config from 'config'
import { get } from 'axios'
import log from '../log'
import { getWeatherUrl } from '../urls'

export default async function getWeather () {
  const url = getWeatherUrl(config.apis.weather.key, config.apis.weather.cityId)

  try {
    const { data } = await get(url)
    return data
  } catch (e) {
    log.error('Unable to retrieve weather')
    throw e
  }
}
