const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.set('view engine', 'pug');

const greetings = require('./greetings');
const medicals = require('./medicals');

app.use('/', greetings);
app.use('/medicals', medicals);

app.listen(3000, function () {
    console.log('Application listening on port 3000')
});