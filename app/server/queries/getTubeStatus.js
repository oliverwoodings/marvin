import config from 'config'
import { get } from 'axios'
import log from '../log'
import { getTubeDisruptionUrl } from '../urls'

export default async function getTubeStatus () {
  try {
    const { data } = await get(getTubeDisruptionUrl())

    return {
      disrupted: data.length > 0,
      disruptions: data
    }
  } catch (e) {
    log.error('Unable to retrieve tube status')
    throw e
  }
}
