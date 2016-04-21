import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore from './configureStore'
import createRouter from './createRouter'

const container = document.getElementById('container')
const store = configureStore()
const router = createRouter()

renderRoot()

if (module.hot) {
  module.hot.accept('./views/Root', renderRoot)
}

function renderRoot () {
  render(
    <AppContainer
      component={require('./views/Root').default}
      props={{ store, router }}
    />,
    container
  )
}
