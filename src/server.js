require('../config/config');
const express = require('express');
const app = express();
const routes = require('./application/routes');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(process.env.PORT, ()=> {
    console.log(`Escuchando puerto ${process.env.PORT}`);
})