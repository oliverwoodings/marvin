import {
  RECEIVE_INIT,
  RECEIVE_SHOW_TUBE_STATUS,
  RECEIVE_PLAY_MEDIA,
  RECEIVE_STOP_MEDIA
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
      case RECEIVE_PLAY_MEDIA:
        if (payload.mediaType === 'news') {
          dispatch(transitionTo('news'))
        } else if (payload.mediaType.includes('radio')) {
          dispatch(transitionTo('radio', { station: payload.mediaType }))
        }
        break
      case RECEIVE_STOP_MEDIA:
        dispatch(transitionTo('/'))
        break
    }


    dispatch({ type, payload })
  }
}
