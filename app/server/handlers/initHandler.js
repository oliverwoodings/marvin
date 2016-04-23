import log from '../log'
import createHandler from '../lib/createHandler'
import getWeather from '../queries/getWeather'
import getForecast from '../queries/getForecast'

export default createHandler('INIT', async (socket) => {
  try {
    const weather = await getWeather()
    const forecast = await getForecast()

    socket.emit('INIT', {
      weather,
      forecast
    })
  } catch (e) {
    log.error('Unable to respond to init', e)
  }
})
