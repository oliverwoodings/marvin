import {
  RECEIVE_INIT,
  RECEIVE_QUESTION_RESPONSE
} from '../constants'
import { reload } from './navigationActions'
import { processQuestionResponse } from './questionActions'

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

    if (type === RECEIVE_QUESTION_RESPONSE) {
      dispatch(processQuestionResponse(payload))
    }

    dispatch({ type, payload })
  }
}
