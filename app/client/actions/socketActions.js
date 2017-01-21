import {
  RECEIVE_INIT,
  RECEIVE_SHOW_TUBE_STATUS,
  RECEIVE_PLAY_NEWS,
  RECEIVE_STOP_NEWS
} from '../constants'
import { reload, transitionTo } from './navigationActions'

export function receiveMessage ({ data }) {
  return (dispatch, getState) => {
    const type = `RECEIVE_${data[0]}`
    const payload = data[1]

    switch (type) {
      case RECEIVE_INIT:
        const oldHash = getState().init.get('gitHash')
        const newHash = payload.gitHash

        if (oldHash !== newHash && oldHash !== null) {
          dispatch(reload())
        }
        break
      case RECEIVE_SHOW_TUBE_STATUS:
        dispatch(transitionTo('tube-status'))
        setTimeout(() => dispatch(transitionTo('/')), 20000)
        break
      case RECEIVE_PLAY_NEWS:
        dispatch(transitionTo('news'))
        break
      case RECEIVE_STOP_NEWS:
        dispatch(transitionTo('/'))
        break
    }


    dispatch({ type, payload })
  }
}
