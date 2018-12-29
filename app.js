//external libararies
const createError = require('http-errors');
const path = require('path');
const cookieParser =  require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;




/*
//rendert de index pagina
app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})

//Getting the data and POST it to the index
app.post('/', function (req, res) {
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
})

*/

//poort where site is listing
app.listen(10333);
