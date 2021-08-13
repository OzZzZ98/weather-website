const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocoding = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

const app = express()
const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ozz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ozz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ozz',
        content: 'Want any help?'
    })
})


app.get('/weather', (req, res)=> {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocoding(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location : location,
                forecast : forecastData
            })
          })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Ozz',
        content: 'Help article not found'
    })
})

app.get('*', (req, res)=> {
    res.render('error', {
        title: '404',
        name: 'Ozz',
        content: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('SERVER IS UP ON PORT ' + port)
})


