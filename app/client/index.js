import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import io from 'socket.io-client'
import ioWildcard from 'socketio-wildcard'
import configureStore from './configureStore'
import getAuthKey from './lib/getAuthKey'

const socket = io(`/?key=${getAuthKey()}`)
ioWildcard(io.Manager)(socket)


const recognition = new webkitSpeechRecognition()
recognition.continuous = true
recognition.interimResults = true

const container = document.getElementById('container')
const store = configureStore(socket, recognition)

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
