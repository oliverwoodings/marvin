function doSpeak () {
  chrome.tts.speak('Hello wassup?')
}

setInterval(doSpeak, 4000)
