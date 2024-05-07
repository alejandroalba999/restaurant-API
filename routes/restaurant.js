const express = require('express');
const app = express();
const { restaurant } = require('../models/restaurant');
const { randomUUID } = require('crypto'); // Added in: node v14.17.0
const { Op } = require("sequelize");


app.get('/', async (req, res) => {
    try {
        const getProd = await restaurant.findAll({});
        return res.status(200).json(getProd)
    } catch (error) {
        const errorModel = error.errors;
        if (errorModel) return res.status(400).json({ msgError: errorModel[0].message, path: errorModel[0].path })
        return res.status(500).json({ res: 'Server Error' })
    }
})
app.get('/:id_restaurant', async (req, res) => {
    try {
        const idRestaurant = req.params.id_restaurant;
        const getRestaurants = await restaurant.findAll({
            where: {
                id: idRestaurant
            }
        });
        return res.status(200).json(getRestaurants)
    } catch (error) {
        const errorModel = error.errors;
        if (errorModel) return res.status(400).json({ msgError: errorModel[0].message, path: errorModel[0].path })
        return res.status(500).json({ res: 'Server Error' })
    }
})
app.post('/', async (req, res) => {
    try {
        const body = req.body;
        body.id = randomUUID();
        const createProd = await restaurant.create(body);
        await createProd.save();
        return res.status(200).json({ res: "Success data register", prod: body })
    } catch (error) {
        const errorModel = error.errors;
        if (errorModel) return res.status(400).json({ msgError: errorModel[0].message, path: errorModel[0].path })
        return res.status(500).json({ res: 'Server Error' })
    }
})
app.put('/:id_restaurant', async (req, res) => {
    try {
        const idRestaurant = req.params.id_restaurant;
        const body = req.body;
        const existerestaurant = await restaurant.findOne({ where: { id: idRestaurant } })
        if (!existerestaurant) return res.status(400).json({ msgError: 'ID was not found', codigo: 409 })
        await restaurant.update({ ...body }, { where: { id: idRestaurant } })
        return res.status(200).json({})
    } catch (error) {
        const errorModel = error.errors;
        if (errorModel) return res.status(400).json({ msgError: errorModel[0].message, path: errorModel[0].path })
        return res.status(500).json({ res: 'Server Error' })
    }
})
app.delete('/:id_restaurant', async (req, res) => {
    try {
        const idRestaurant = req.params.id_restaurant;
        await restaurant.destroy({ where: { id: idRestaurant } });
        return res.status(200).json({ res: 'Restaurant was deleted successfully' })
    } catch (error) {
        const errorModel = error.errors;
        if (errorModel) return res.status(400).json({ msgError: errorModel[0].message, path: errorModel[0].path })
        return res.status(500).json({ res: 'Server Error' })
    }
})
// app.get('/csv', async (req, res) => {
//     const fs = require('fs');

//     fs.readFile('./restaurantes.csv', 'utf8', async function (err, data) {
//         const allRestaurants = csvJSON(data);
//         for (const rest of allRestaurants) {
//             const a = restaurant.build(rest);
//             await a.save();
//         }

//         return res.status(200).json(allRestaurants);
//     });
// })

// function csvJSON(csv) {
//     const lines = csv.split('\n')
//     const result = []
//     const headers = lines[0].split(',')

//     for (let i = 1; i < lines.length; i++) {
//         if (!lines[i])
//             continue
//         const obj = {}
//         const currentline = lines[i].split(',')

//         for (let j = 0; j < headers.length; j++) {
//             obj[headers[j]] = currentline[j]
//         }
//         result.push(obj)
//     }
//     return result
// }

module.exports = app;