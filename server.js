const express = require('express');
const app = express();
require('colors')
const {sequelize} = require('./databases/postgres.js')
app.use(express.json())
// Habilita CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use('/api-interna/general', require('./routes/index'));

app.listen(4000, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  console.log('Conexion con la base de datos exitosa');
} catch (error) {
  console.error('Error con la conexion de la base de datos:', error);
}
console.log('Server online Port:', `${4000}`.yellow);
})

module.exports = app;