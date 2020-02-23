const express = require('express');
// Routes
const currencyExchange = require('./currency-exchange.route');
const weather = require('./weather.route');

// eslint-disable-next-line
const router = express.Router();

// Routes currency exchange
router.use('/currency-exchange/', currencyExchange);
router.use('/weather/', weather);


module.exports = router;
