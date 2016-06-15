import invariant from 'invariant'
import { SPEECH_SYNTHESIS_VOICE } from '../constants'

// pre-load voices
window.speechSynthesis.getVoices()

export default function speak (text) {
  return new Promise((resolve) => {
    const msg = new SpeechSynthesisUtterance(text)

    msg.voice = getVoice()
    msg.onend = resolve

    speechSynthesis.speak(msg)
  })
}

function getVoice () {
  const voice = window.speechSynthesis.getVoices().find((voice) => {
    return voice && voice.name === SPEECH_SYNTHESIS_VOICE
  })

  invariant(!!voice, 'Voice does not exist')
  return voice
}
