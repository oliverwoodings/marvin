import {
  SEND_QUESTION,
  PROCESS_QUESTION_RESPONSE_STARTED,
  PROCESS_QUESTION_RESPONSE_FINISHED,
  INTENT_TRANSPORT_DISRUPTION
} from '../constants'
import { speakText } from './speechActions'
import transportDisruption from '../speechGenerators/transportDisruption'

const generators = {
  [INTENT_TRANSPORT_DISRUPTION]: transportDisruption
}

export function processQuestionResponse({ outcomes }) {
  return async (dispatch, getState) => {
    const outcome = outcomes[0]

    dispatch({ type: PROCESS_QUESTION_RESPONSE_STARTED })

    const generator = generators[outcome.intent]

    if (outcome.confidence < 0.5) {
      await speak('I\'m not really sure what you said, sorry!')
    } else if (!generator) {
      await speak('My AI has worked out what you want but I don\'t know how to tell you about it!')
    } else {
      await generator(outcome, getState(), speak)
    }

    dispatch({ type: PROCESS_QUESTION_RESPONSE_FINISHED })

    function speak (text) {
      return speakText(text)(dispatch, getState)
    }
  }
}

export function sendQuestion (question) {
  return {
    type: SEND_QUESTION,
    payload: { question }
  }
}
