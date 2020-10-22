//Require Core Modules
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Require npm Modules
const express = require('express')
const hbs = require('hbs')

const app = express()


//Setup Static Directory to Serve
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

//Setup views engine
app.set('view engine', 'hbs')

//Setup Views directory path
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

//Setup Partials directory path
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


// Setup Page Get Requests
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Swarnab Garang'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Swarnab Garang',
        aboutText: 'This is a weather application which uses the WeatherStack API and the Mapbox Geocoding API to fetch weather information of a particular valid location entered by the user.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Swarnab Garang',
        helpText: "Please go to Weather tab and enter a valid Location. You will get current weather data. Thank you"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (err, data) => {
        if(err){
            return res.send({
                error: err
            })
        }
        forecast(data.latitude, data.longitude, (err, cast) => {
            if(err){
                return res.send({
                    error: err
                })
            }
            res.send({
                Place: req.query.address,
                Location: data.location,
                Weather: cast
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('err404', {
        title: 'Error',
        name: 'Swarnab Garang',
        errorText: 'Sorry. Help Article not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('err404', {
        title: 'Error',
        name: 'Swarnab Garang',
        errorText: 'Sorry. Page not Found!'
    })
})



//Setup Port for listen
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
