const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://us1.locationiq.com/v1/search?key=pk.0cbbc65581b86e5929cad69a8bd44cb6' + '&q=' + encodeURIComponent(address)+ '&format=json&limit=1'; 
        
    request({ url, json:true }, (error, response, body)=>{
        if(error){
            callback("Bağlantı Hatası", undefined)
        }
        else if (body.error){
            callback("Url Hatası Geocode", undefined);
        }
        else{
            console.log(body)
            const data = {
                longtitude: body[0].lat,
                latitude: body[0].lon,
                location: body[0].display_name,
            }
            callback(undefined, data) 
        }
    })
}
module.exports = geocode