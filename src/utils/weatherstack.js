const request = require('postman-request');

const weatherstack = (longtitude, latitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=c76f8eb5e80e139269d072f0fc26e728&query=' + latitude + ',' + longtitude

    request({ url, json:true }, (error, response, {error: forecastError, current})=>{
        if(error){
            callback("Bağlantı Hatası", undefined)
        }
        else if (forecastError){
            console.log(url)
            callback("Url Hatası Weatherstack", undefined);
        }
        else{
            console.log(current.precip)
            const data = {
                temperature: current.temperature,
                weather_descriptions: current.weather_descriptions[0],
                humidity: current.humidity,
                pericipitation: current.precip,
            } 
                
            callback(undefined, data) 
        }
    })

}
module.exports = weatherstack