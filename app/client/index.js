import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import urlite from 'urlite/querystring/urlite'
import io from 'socket.io-client'
import ioWildcard from 'socketio-wildcard'
import configureStore from './configureStore'

const { query } = urlite.parse(window.location.search)
const socket = io(`/?key=${query.key}`)
ioWildcard(io.Manager)(socket)

const container = document.getElementById('container')
const store = configureStore(socket)

renderRoot()

if (module.hot) {
  module.hot.accept('./views/Root', renderRoot)
}

function renderRoot () {
  render(
    <AppContainer
      component={require('./views/Root').default}
      props={{ store }}
    />,
    container
  )
}
