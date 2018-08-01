const request = require('request')
const keys = require('../config/keys')

const convertFahrenheitToCelcius = (f) => {
  return ((f - 32) * 5) / 9
}

const getWeather = (lat, long, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${keys.apiKey}/${lat},${long}`,
      json: true,
    },
    (error, body, response) => {
      if (error) {
        callback('Unable to connect to Darksky.net server.')
      } else if (response.statusCode === 404) {
        callback('Unable to fetch weather.')
      }
      callback(
        `It is ${convertFahrenheitToCelcius(
          response.currently.temperature
        )} celcius, but it feels like ${convertFahrenheitToCelcius(
          response.currently.apparentTemperature
        )}`
      )
    }
  )
}

module.exports = {
  getWeather,
}
