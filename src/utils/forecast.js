const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9647e00fcfc238fb576ac4034a0b5ea1&query=' + longitude + ',' + latitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!')
        } else if (body.error) {
            callback('Unable to find location!')
        }
        else {
                const data = body.current
                temperature = data.temperature
                feelslike = data.feelslike
                weather_desc = data.weather_descriptions[0]
                callback(undefined,{
                    weather_desc: weather_desc, 
                    temperature: temperature,
                    feelslike: feelslike
                })
        }
    })
}
module.exports = forecast