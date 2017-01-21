import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import io from 'socket.io-client'
import ioWildcard from 'socketio-wildcard'
import createRouter from './createRouter'
import configureStore from './configureStore'
import getAuthKey from './lib/getAuthKey'
import { receiveRouter } from './actions/navigationActions'

const socket = io(`/?key=${getAuthKey()}`)
ioWildcard(io.Manager)(socket)

const container = document.getElementById('container')
const router = createRouter()
const store = configureStore(socket)

receiveRouter(router)

renderRoot()

if (module.hot) {
  module.hot.accept('./views/Root', renderRoot)
}

function renderRoot () {
  const Root = require('./views/Root').default
  render(
    <AppContainer>
      <Root store={store} router={router} />
    </AppContainer>,
    container
  )
}
