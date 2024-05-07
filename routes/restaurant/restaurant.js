const express = require('express');
const app = express();
const { restaurant } = require('../../models/restaurant');
const { randomUUID } = require('crypto'); // Added in: node v14.17.0
const { Op } = require("sequelize");


app.get('/list', async (req, res) => {
    try {
        const getProd = await restaurant.findAll({});
        return res.status(200).json(getProd)
    } catch (error) {
        const errorModel = error.errors;
        if (errorModel) return res.status(400).json({ msgError: errorModel[0].message, path: errorModel[0].path })
        return res.status(500).json({ res: 'Server Error' })
    }
})
app.get('/detail/:id_restaurant', async (req, res) => {
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
app.post('/register', async (req, res) => {
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
app.put('/update/:id_restaurant', async (req, res) => {
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
app.delete('/delete/:id_restaurant', async (req, res) => {
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

module.exports = app;