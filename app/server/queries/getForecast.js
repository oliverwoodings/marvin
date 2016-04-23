import config from 'config'
import { get } from 'axios'
import log from '../log'
import { getForecastUrl } from '../urls'

export default async function getForecast () {
  const url = getForecastUrl(config.apis.weather.key, config.apis.weather.cityId)

  try {
    const { data } = await get(url)
    return data
  } catch (e) {
    log.error('Unable to retrieve forecast')
    throw e
  }
}
