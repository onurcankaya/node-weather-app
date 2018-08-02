const yargs = require('yargs')
const axios = require('axios')

const keys = require('./config/keys')

const convertFahrenheitToCelcius = (f) => {
  return ((f - 32) * 5) / 9
}

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to watch the weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h').argv

const encodedAddress = encodeURIComponent(argv.address)
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios
  .get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find the address')
    }

    const lat = response.data.results[0].geometry.location.lat
    const lng = response.data.results[0].geometry.location.lng
    const weatherUrl = `https://api.darksky.net/forecast/${
      keys.apiKey
    }/${lat},${lng}`
    console.log(response.data.results[0].formatted_address)
    return axios.get(weatherUrl)
  })
  .then((response) => {
    const temperature = response.data.currently.temperature
    const apparentTemperature = response.data.currently.apparentTemperature
    console.log(
      `It's currently ${convertFahrenheitToCelcius(
        temperature
      )}celcius, but it feels like ${convertFahrenheitToCelcius(
        apparentTemperature
      )}`
    )
  })
  .catch((error) => {
    if (error.code === 'ENOTFOUND') {
      console.log('unable to connect to API servers')
    } else {
      console.log(error.message)
    }
  })
