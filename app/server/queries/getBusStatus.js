import config from 'config'
import _ from 'lodash'
import { get } from 'axios'
import log from '../log'
import { getBusDisruptionUrl } from '../urls'

export default async function getBusStatus () {
  try {
    const buses = config.apis.tfl.buses

    const busStatuses = await Promise.all(buses.map(async (bus) => {
      const url = getBusDisruptionUrl(bus)

      return (await get(url)).data
    }))

    const delays = _.flatten(busStatuses.filter((busStatus) => {
      return busStatus.length > 0
    }))

    return {
      disrupted: delays.length > 0,
      disruptions: delays
    }
  } catch (e) {
    log.error('Unable to retrieve bus status')
    throw e
  }
}
