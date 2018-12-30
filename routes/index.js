let express = require('express');
let router = express.Router();
const request = require('request');

const apiKey = '0de153a6e7924982ab8b6a2131983a2d';

/* GET home page. */
router.get('/~s1091971/P2_NodeJS_Opdracht/333', function (req, res, next) {
    error = req.query.error;
    res.render('index', {title: 'WeatherApp', error: error});
});

router.get('/weather', function (req, res, next) {

    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {


                const knots  = Math.round(weather.wind.speed * 1.944).toFixed(1);
                const temp = Math.round(weather.main.temp);

                let weatherText= `It's ${temp} degrees Celcius in ${weather.name}!`;
                let weartherWind= `The wind speed in ${knots} knots !`;

                res.render('index', {weather: weatherText, test: weartherWind, temp: temp, error: null});
            }
        }
    });
});

module.exports = router;