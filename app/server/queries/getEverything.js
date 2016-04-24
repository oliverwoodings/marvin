import log from '../log'
import getWeather from '../queries/getWeather'
import getForecast from '../queries/getForecast'
import getTubeStatus from '../queries/getTubeStatus'
import getTrainStatus from '../queries/getTrainStatus'
import getBusStatus from '../queries/getBusStatus'

export default async function getEverything () {
  try {
    const [weather, forecast, train, tube, bus] = await Promise.all([
      getWeather(),
      getForecast(),
      getTrainStatus(),
      getTubeStatus(),
      getBusStatus()
    ])

    return {
      weather,
      forecast,
      transport: {
        train,
        tube,
        bus
      }
    }
  } catch (e) {
    log.error('Unable to retrieve forecast')
    throw e
  }
}