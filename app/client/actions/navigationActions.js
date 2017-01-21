import { RELOAD, TRANSITION_TO } from '../constants'

let router = null

export function reload () {
  return (dispatch) => {
    dispatch({ type: RELOAD })
    window.location.reload()
  }
}

export function transitionTo (name, params, query) {
  return (dispatch) => {
    dispatch({
      type: TRANSITION_TO,
      payload: { name, params, query }
    })
    router.transitionTo(name, params, query)
  }
}

export function receiveRouter (_router) {
  router = _router
}
