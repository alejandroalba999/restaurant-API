const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/postgres');

const restaurant = sequelize.define('restaurant', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                 args: true,
                 msg: "El valor no puede ser vacio"
            },
            max: {
                args: 4,
                msg: 'The max rating is 4'
            },
            min: {
                args: [0],
                msg: 'The min rating is 0'
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    site: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    lng: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'restaurant'
});

module.exports = { restaurant }
