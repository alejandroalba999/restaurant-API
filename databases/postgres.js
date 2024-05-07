const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '.env' });
const procEnv = process.env;

const sequelize = new Sequelize(procEnv.URL_POSTGREST, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {},
  logging: false
});
module.exports = {sequelize};