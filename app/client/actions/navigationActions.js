import { RELOAD } from '../constants'

export default function reload () {
  return (dispatch) => {
    dispatch({ type: RELOAD })
    window.reload()
  }
}
