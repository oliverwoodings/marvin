import { join } from 'path'
import config from 'config'
import express from 'express'
import hotLoad from './lib/hotLoad'
import log from './log'

const app = express()
const dist = join(__dirname, '..', '..', 'dist')
const env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  hotLoad(app)
}

app.use('/', express.static(dist))

app.listen(config.port, () => {
  log.info(`Marvin started (http://localhost:${config.port})`)
})
