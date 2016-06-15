export function getWeatherUrl (apiKey, cityId) {
  return `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${apiKey}&units=metric`
}

export function getForecastUrl (apiKey, cityId) {
  return `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${apiKey}&units=metric`
}

export function getTubeDisruptionUrl () {
  return `https://api.tfl.gov.uk/Line/Mode/tube/Disruption`
}

export function getTrainDisruptionUrl (apiKey, from, to) {
  return `https://huxley.apphb.com/delays/${to}/from/${from}/20?accessToken=${apiKey}`
}

export function getBusDisruptionUrl (bus) {
  return `https://api.tfl.gov.uk/Line/${bus}/Disruption`
}

export function getWitUrl (question) {
  return `https://api.wit.ai/message?q=${encodeURIComponent(question)}`
}
