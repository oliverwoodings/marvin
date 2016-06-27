import getTTSUrl from 'google-tts-api'
import CombinedStream from 'combined-stream'
import axios from 'axios'
import { parse } from 'url'
import https from 'https'

export default async function ttsHandler (req, res, next) {
  try {
    const { text } = req.query
    const blocks = text.match(/.{1,100}/g)

    const combinedStream = CombinedStream.create()

    await Promise.all(blocks.map(async (block) => {
      const url = await getTTSUrl(text)
      const { host, path } = parse(url)

      const options = {
        host,
        path,
        headers: {
          'user-agent': 'WHAT_EVER'
        }
      }

      combinedStream.append((combine) => {
        https.get(options, combine)
      })
    }))

    combinedStream.pipe(res)
  } catch (e) {
    next(e)
  }
}
