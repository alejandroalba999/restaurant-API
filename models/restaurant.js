const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/postgres');

const producto = sequelize.define('producto', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoicrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                 args: true,
                 msg: "El valor no puede ser vacio"
            },
            len: {
                args: [2, 20],
                msg:'La longitud del campo debe ser mayor a 1 y menor a 20'
            }
        }
    },
    activo: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    id_usuario_alta: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'producto'
});

module.exports = {producto}
