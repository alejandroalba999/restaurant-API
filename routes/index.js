const express = require('express');
const app = express.Router();

app.use('/restaurant', require('./restaurant/index'));

module.exports = app;