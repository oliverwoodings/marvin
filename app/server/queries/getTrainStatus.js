import config from 'config'
import { get } from 'axios'
import log from '../log'
import { getTrainDisruptionUrl } from '../urls'

export default async function getTrainStatus () {
  try {
    const routes = config.apis.huxley.routes

    const routeStatuses = await Promise.all(routes.map(async (route) => {
      const url = getTrainDisruptionUrl(config.apis.huxley.key, route.from, route.to)

      return (await get(url)).data
    }))

    const delays = routeStatuses.filter((routeStatus) => {
      return routeStatus.delays
    })

    return {
      disrupted: delays.length > 0,
      disruptions: delays
    }
  } catch (e) {
    log.error('Unable to retrieve train status')
    throw e
  }
}
