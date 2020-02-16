const express = require('express');
// Routes
const currencyExchange = require('./currency-exchange.route');

// eslint-disable-next-line
const router = express.Router();

// Routes currency exchange
router.use('/currency-exchange/', currencyExchange);

module.exports = router;
