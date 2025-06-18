const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { error } = require('console');
const geocode = require('./utils/geocode.js')
const weatherstack = require('./utils/weatherstack.js')

console.log(__dirname);

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../temp/views');
const partialsPath = path.join(__dirname, '../temp/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath); 
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Ana Sayfa',
        name: 'Metehan Sözenli'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Sayfası',
        name: 'Metehan Sözenli'
    });
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Yardım Sayfası',
        name: 'Metehan Sözenli',
    });
}) 


// app.get('/weather', (req, res) => {
//     // res.render('weather', {
//     //     location: 'Ankara',
//     //     temperature: 25,
//     //     weather_descriptions: 'Güneşli',
//     //     title: 'Hava Durumu Sayfası',
//     //     name: 'Metehan Sözenli',
//     // });
//     res.send({
//         location: "bursa",
//         forecast: "güneşli"
//     })
// })

//ilk örnek
// app.get('/products', (req, res) => {
//     console.log(req.query.rate) 
//     res.send({
//         products:[]
//     })
// })
// http://localhost:3000/products?search=nodejs&rate=5
//burada rate veya search diyerek aşağıdaki urldeki verileri alabiliriz.

//ikinci örnek
app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: "Search terimini doldurunuz!"
        })
        return  
    }

    console.log(req.query.rate)
    res.send({
        products:[]
    })
})

// Üçüncü örnek
app.get('/weather', (req, res) => {
if(!req.query.address){
        res.send({
            error: "Adres bilgisini doldurunuz!!"
        })
        return 
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        weatherstack(data.latitude, data.longtitude, (weatherstackError, weatherData) => {
            if (weatherstackError) {
                return res.send({ error: weatherstackError });
            }

            res.send({
                address: data.location,
                forecast: weatherData.temperature,
                pericipitation: weatherData.pericipitation,
            });
        });
    });
})



// app.get('/help/*splat', (req, res) => {
//     res.send('<h1> Help Sayfaları Bulunamadı</h1>');
// })
// //Sayfa bulunamadığında 404 hatası vermek
// app.get('*splat', (req, res) => {
//     res.send('<h1> 404 Sayfa Bulunamadı</h1>');
// })

app.get('/help/*splat', (req, res) => {
    res.render('404Notfound',{
        title: '404 Sayfa Not Found',
        name: 'Metehan Sözenli',
        errorMessage: '404 Help Sayfaları Bulunamadı'
    });
})
//Sayfa bulunamadığında 404 hatası vermek
app.get('*splat', (req, res) => {
    res.render('404Notfound',{
        title: '404 Sayfa Not Found',
        name: 'Metehan Sözenli',
        errorMessage: '404 Sayfa Bulunamadı'
    });
})

app.listen(3000, () => {  
    console.log('Server is up on port 3000.');
})

// nodemon app.js -e js,hbs ile özel çalıştırma