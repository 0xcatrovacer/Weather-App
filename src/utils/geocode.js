const request = require('request')


const geocode = (address, callback) => {
    const url = process.env.MAP_API_1 + encodeURIComponent(address) + process.env.MAP_API_2
    
    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to Geocode Service.', undefined)
        }
        else if (res.body.features.length === 0) {
            callback('Unable to find Location', undefined)
        }
        else {
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
