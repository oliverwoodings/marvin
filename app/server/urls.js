export function getWeatherUrl (apiKey, cityId) {
  return `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${apiKey}&units=metric`
}

export function getForecastUrl (apiKey, cityId) {
  return `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${apiKey}&units=metric`
}
