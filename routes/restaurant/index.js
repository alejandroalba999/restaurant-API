const express = require('express');
const app = express.Router();

app.use('/', require('./restaurant'));
app.use('/statistics', require('./statistics'));

module.exports = app;