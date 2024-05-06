const express = require('express');
const app = express();

app.use('/restaurant', require('./restaurant'));

module.exports = app;