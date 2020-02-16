const express = require('express');

// Controllers
const CurrencyExchangeController = new (require('../controllers/currency-exchange.controller'))();

// eslint-disable-next-line
const router = express.Router();

router.route('/dollar').get(CurrencyExchangeController.getDollarCurrency);

module.exports = router;
