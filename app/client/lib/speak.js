export default function speak (text) {
  return new Promise((resolve) => {
    const audio = new Audio(`/api/tts?text=${encodeURIComponent(text)}`)

    audio.addEventListener('ended', resolve)
    audio.addEventListener('error', resolve)
    audio.addEventListener('abort', resolve)

    audio.play()
  })
}
