import React, { Component } from 'react'
import { connect } from 'react-redux'
import { transitionTo } from '../../actions/navigationActions'

class ReturnToRoot extends Component {
  componentDidMount () {
    this.timerId = setTimeout(::this.returnToRoot, 20000)
  }

  componentWillUnmount () {
    clearTimeout(this.timerId)
    this.timerId = null
  }

  returnToRoot () {
    this.props.transitionTo('/')
  }

  render () {
    return null
  }
}

export default connect(null, { transitionTo })(ReturnToRoot)
