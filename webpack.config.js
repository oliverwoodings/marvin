const resolve  = require('path').resolve;
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development'

const config = {
  context: __dirname,
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    './app/client/index'
  ],
  output: {
    path: resolve(__dirname, 'dist', 'javascript'),
    filename: 'bundle.js',
    publicPath: '/javascript/'
  },
  resolve: {
    alias: {
      'react': resolve(__dirname, 'node_modules', 'react')
    },
    fallback: resolve(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.DefinePlugin({
      //'process.env.NODE_ENV': '"' + env + '"'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  resolveLoader: {
    'fallback': resolve(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: resolve(__dirname, 'app', 'client')
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline'
      }
    ]
  },
  postcss: function (webpack) {
    return [
      require('postcss-import')({
        addDependencyTo: webpack,
        path: ['app/client/styles']
      }),
      require('postcss-cssnext')(),
      require('postcss-browser-reporter')(),
      require('postcss-reporter')()
    ]
  }
}

if (env === 'development') {
  config.entry.unshift('webpack-hot-middleware/client?reload=true')
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new webpack.NoErrorsPlugin())
}

module.exports = config
