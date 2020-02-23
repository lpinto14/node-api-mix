const express = require('express');

// Controllers
const WeatherController = new (require('../controllers/weather.controller'))();

// eslint-disable-next-line
const router = express.Router();

router.route('/:city').get(WeatherController.getCityWeather);

module.exports = router;
