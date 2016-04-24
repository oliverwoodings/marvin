import log from '../log'
import createHandler from '../lib/createHandler'
import getWeather from '../queries/getWeather'
import getForecast from '../queries/getForecast'
import getTubeStatus from '../queries/getTubeStatus'
import getTrainStatus from '../queries/getTrainStatus'
import getBusStatus from '../queries/getBusStatus'

export default createHandler('INIT', async (socket) => {
  try {
    const weather = await getWeather()
    const forecast = await getForecast()
    const transport = {
      train: await getTrainStatus(),
      tube: await getTubeStatus(),
      bus: await getBusStatus()
    }

    socket.emit('INIT', {
      weather,
      forecast,
      transport
    })
  } catch (e) {
    log.error('Unable to respond to init', e)
  }
})
