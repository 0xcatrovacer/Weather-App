const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = process.env.WEATHER_API_1 + latitude + process.env.WEATHER_API_2 + longitude

    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to Geocode Service.', undefined)
        }
        else if (res.body.error) {
            callback('Unable to find Location', undefined)
        }
        else {
            callback(undefined, 'The temperature is ' + res.body.current.temperature + ' degrees out, but it feels like ' + res.body.current.feelslike + ' degrees' + "<br>The weather condition is " + res.body.current.weather_descriptions[0] + "<br>The wind speed is " + res.body.current.wind_speed + ' kilometres/hr, blowing ' + res.body.current.wind_degree + " degrees " + res.body.current.wind_dir + "<br>The air pressure is " + res.body.current.pressure + " millibars" + "<br>The current precipitation is " + res.body.current.precip + ' millimeters' + "<br>The humidity is " + res.body.current.humidity + "%" + "<br>The cloud cover of the area is " + res.body.current.cloudcover + '%')
        }
    })
}

module.exports = forecast