const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '.env' });
const proccEnv = process.env;
const DB_LINK = 'postgres://restaurant_3s7i_user:svQc2cdCrNHH5ZEbdaAEOhWYF4xFUbuE@dpg-cosm24o21fec73eqbd1g-a.oregon-postgres.render.com/restaurant_3s7i?ssl=true'

const sequelize = new Sequelize(DB_LINK, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {},
  logging: false,
  force: true
});
module.exports = {sequelize};