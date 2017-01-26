import config from 'config'
import _ from 'lodash'
import { get } from 'axios'
import log from '../log'
import { getTubeDisruptionUrl } from '../urls'

export default async function getTubeStatus () {
  try {
    const { data } = await get(getTubeDisruptionUrl())

    return {
      disrupted: data.length > 0,
      disruptions: data.reduce((memo, disruption) => {
        const existingDescription = !!_.find(memo, (d) => {
          return d.description === disruption.description
        })
        if (!existingDescription) {
          memo.push(disruption)
        }
        return memo
      }, [])
    }
  } catch (e) {
    log.error('Unable to retrieve tube status')
    throw e
  }
}
