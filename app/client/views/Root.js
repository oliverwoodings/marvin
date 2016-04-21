import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'cherrytree-for-react'

export default class Root extends Component {
  render() {
    const { store, router } = this.props
    return (
      <Provider store={store}>
        <Router router={router} />
      </Provider>
    )
  }
}