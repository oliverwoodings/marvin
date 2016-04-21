import log from '../log'

export default function hotLoad (app) {
  const webpack = require('webpack')
  const dev = require('webpack-dev-middleware')
  const hot = require('webpack-hot-middleware')
  const config = require('../../../webpack.config')

  const compiler = webpack(config)
  const options = {
    noInfo: true,
    stats: { colors: true },
    publicPath: config.output.publicPath
  }

  log.info('Starting hot reloading')

  app.use(dev(compiler, options))
  app.use(hot(compiler))
}
