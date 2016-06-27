import {
  MARVIN_TIMEOUT_INTERVAL,
  HEY_MARVIN,
  HEY_MARVIN_TIMEOUT,
  RECEIVED_SPEECH,
  START_SPEAKING,
  STOP_SPEAKING,
  RECEIVE_SPEECH_RECOGNITION,
  RECOGNITION_ENDED,
  RECOGNITION_STARTED,
  RECOGNITION_ERROR
} from '../constants'
import { sendQuestion } from './questionActions'
import speak from '../lib/speak'

export function speechResult ({ results, resultIndex }) {
  return (dispatch, getState) => {
    const result = results[resultIndex]
    const transcript = result[0].transcript.toLowerCase().trim()

    if (isSpeaking()) {
      return
    }

    console.log(transcript, result.isFinal)

    if (transcript.match(/(hey|ok|hi) (marvin|morgan)/) && !isActive()) {
      setTimeout(() => {
        dispatch({
          type: HEY_MARVIN_TIMEOUT,
          payload: {
            activationIndex: resultIndex
          }
        })
      }, MARVIN_TIMEOUT_INTERVAL)

      dispatch({
        type: HEY_MARVIN,
        payload: {
          activationIndex: resultIndex
        }
      })

      getState().speech.get('recognition').abort()
    } else if (isActive()) {
      const question = transcript.replace(/^((hey|ok) )?marvin/, '').trim()

      if (!question.length) {
        return
      }

      dispatch({
        type: RECEIVED_SPEECH,
        payload: { question }
      })

      if (!isQuestioning() && result.isFinal) {
        dispatch(sendQuestion(question))
      }
    }

    function isSpeaking () {
      return getState().marvin.get('speaking')
    }

    function isActive () {
      return getState().marvin.get('active')
    }

    function isQuestioning () {
      return getState().marvin.get('questioning')
    }
  }
}

export function speakText (text) {
  return async (dispatch, getState) => {
    const recognition = getState().speech.get('recognition')

    dispatch({
      type: START_SPEAKING,
      payload: { text }
    })
    recognition.abort()

    await speak(text)

    dispatch({
      type: STOP_SPEAKING,
      payload: { text }
    })
    recognition.start()
  }
}

export function receiveRecognition (recognition) {
  return (dispatch) => {
    dispatch({
      type: RECEIVE_SPEECH_RECOGNITION,
      payload: { recognition }
    })

    recognition.start()
  }
}

export function recognitionStarted () {
  return { type: RECOGNITION_STARTED }
}

export function recognitionError (error, message) {
  return {
    type: RECOGNITION_ERROR,
    payload: { error, message }
  }
}

export function recognitionEnded () {
  return (dispatch, getState) => {
    dispatch({ type: RECOGNITION_ENDED })

    const { marvin, speech } = getState()

    if (!marvin.get('speaking')) {
      speech.get('recognition').start()
    }
  }
}
