const express = require('express');
const app = express();
const routes = require('./application/routes');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(3000, () => {
    console.log('Escuchando puerto 3000');
})