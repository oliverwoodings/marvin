import log from '../log'
import getWeather from './getWeather'
import getForecast from './getForecast'
import getTubeStatus from './getTubeStatus'
import getTrainStatus from './getTrainStatus'
import getBusStatus from './getBusStatus'
import getGitHash from './getGitHash'
import getCalendarEvents from './getCalendarEvents'

export default async function getEverything () {
  try {
    const [weather, forecast, train, tube, bus, calendar] = await Promise.all([
      getWeather(),
      getForecast(),
      getTrainStatus(),
      getTubeStatus(),
      getBusStatus(),
      getCalendarEvents('day')
    ])
    const gitHash = getGitHash()

    return {
      weather,
      forecast,
      transport: {
        train,
        tube,
        bus
      },
      gitHash,
      calendar
    }
  } catch (e) {
    log.error('Unable to retrieve everything')
    throw e
  }
}