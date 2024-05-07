const express = require('express');
const app = express();
const { restaurant } = require('../../models/restaurant');
const { getAvg } = require('../../utils/functions');
const { Op, Sequelize } = require("sequelize");

app.get('/', async (req, res) => {
    try {
        const lat = req.query.latitude;
        const long = req.query.longitude;
        const radius = req.query.radius;

        if (!lat || !long) return res.status(400).json({ res: 'Parameters Lat & Long are required' })
        const getRestaurants = await restaurant.findAll({
            attributes: {
                include: [
                    [Sequelize.literal(`SQRT(POW(69.1 * (${lat}::float -  restaurant.lat::float), 2) + POW(69.1 * (restaurant.lng::float - ${long}::float) * COS(${lat}::float / 57.3), 2))`), 'distance']
                ]
            }
        });
        let areaRestaurant = [];
        for (const rest of getRestaurants) {
            if (Math.round(rest.dataValues.distance, 2) <= radius) {
                areaRestaurant.push({ ...rest.dataValues, distance: Math.round(rest.dataValues.distance, 2) });
            }
        }
        return res.status(200).json({ res: areaRestaurant, count: areaRestaurant.length, avg: getAvg(areaRestaurant) })
    } catch (error) {
        const errorModel = error.errors;
        if (errorModel) return res.status(400).json({ msgError: errorModel[0].message, path: errorModel[0].path })
        return res.status(500).json({ res: 'Server Error' })
    }
})

module.exports = app;