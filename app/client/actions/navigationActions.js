import { RELOAD } from '../constants'

export function reload () {
  return (dispatch) => {
    dispatch({ type: RELOAD })
    window.location.reload()
  }
}
