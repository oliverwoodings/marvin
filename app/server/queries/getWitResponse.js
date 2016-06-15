import config from 'config'
import { get } from 'axios'
import log from '../log'
import { getWitUrl } from '../urls'

export default async function getWitResponse (question) {
  const url = getWitUrl(question)

  try {
    const { data } = await get(url, {
      headers: {
        'Authorization': `Bearer ${config.apis.wit.key}`
      }
    })
    return data
  } catch (e) {
    log.error('Unable to retrieve response from wit')
    throw e
  }
}
