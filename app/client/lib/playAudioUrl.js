import getAuthKey from './getAuthKey'

const FFT_SIZE = 64

export default function playAudioUrl (url, onUpdate) {
  let playing = true

  const audio = new Audio()
  const context = new AudioContext()
  const analyser = context.createAnalyser()
  const source = context.createMediaElementSource(audio)

  audio.src = `/api/stream?key=${getAuthKey()}&url=${encodeURIComponent(url)}`
  analyser.fftSize = FFT_SIZE
  source.connect(analyser)
  source.connect(context.destination)

  const data = new Uint8Array(FFT_SIZE)

  audio.addEventListener('canplay', () => {
    audio.play()
    fetchAudioData()
  })
  audio.addEventListener('error', (e) => {
    console.log(e, e.target.error)
  })

  function fetchAudioData () {
    if (playing) {
      setTimeout(() => requestAnimationFrame(fetchAudioData), 200)
      analyser.getByteTimeDomainData(data)
      onUpdate(data)
    }
  }

  return function stop () {
    playing = false
    audio.pause()
  }
}
