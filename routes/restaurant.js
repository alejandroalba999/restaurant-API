const express = require('express');
const app = express();
const { producto } = require('../models/restaurant');
const { Op } = require("sequelize");


app.get('/nombre/:nombre', async (req, res) => {
    try {
        // const nombre = req.params.nombre && req.params.nombre.toUpperCase();
        const getProd = await producto.findAll({
            //    where: {
            //         nombre: { [Op.like]: `%${nombre}%` }
            //     }
        });
        return res.status(200).json(getProd)
    } catch (error) {
        const errorModel = error.errors;
        if (errorModel) return res.status(400).json({ msgError: errorModel[0].message, path: errorModel[0].path })
        return res.status(400).json()
    }
})
app.post('/', async (req, res) => {
    try {
        const body = req.body;
        const lastInsert = await producto.findOne({
            order: [
                ['id_producto', 'DESC']
            ]
        })
        const idProducto = parseInt(lastInsert.dataValues.id_producto) + 1
        body.id_producto = idProducto;
        body.id_usuario_alta = 'aalba';
        const createProd = await producto.create(body);
        await createProd.save();
        return res.status(200).json({ res: "producto registrado exitosamente", prod: req.body })
    } catch (error) {
        const errorModel = error.errors;
        if (errorModel) return res.status(400).json({ msgError: errorModel[0].message, path: errorModel[0].path })
        return res.status(400).json()
    }
})
app.put('/:id_producto', async (req, res) => {
    try {
        const idProducto = req.params.id_producto;
        const body = req.body;
        const existeProducto = await producto.findOne({ where: { id_producto: idProducto } })
        if (!existeProducto) return res.status(400).json({ msgError: 'El id_producto no existe', codigo: 409 })
        await producto.update({
            nombre: body.nombre
        }, { where: { id_producto: idProducto } })
        return res.status(200).json({})
    } catch (error) {
        const errorModel = error.errors;
        if (errorModel) return res.status(400).json({ msgError: errorModel[0].message, path: errorModel[0].path })
        return res.status(400).json()
    }
})

module.exports = app;