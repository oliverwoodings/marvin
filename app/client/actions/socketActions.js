import { RECEIVE_INIT } from '../constants'
import { reload } from './navigationActions'

export function receiveMessage ({ data }) {
  return (dispatch, getState) => {
    const type = `RECEIVE_${data[0]}`
    const payload = data[1]

    if (type === RECEIVE_INIT) {
      const oldHash = getState().init.get('gitHash')
      const newHash = payload.gitHash

      if (oldHash !== newHash && oldHash !== null) {
        dispatch(reload())
      }
    }

    dispatch({ type, payload })
  }
}
