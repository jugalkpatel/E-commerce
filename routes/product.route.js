const express = require('express');
const productRouter = express.Router();
const mongoose = require('mongoose');
const { Product } = require('../models/product.model');

productRouter.param('productId', async (req, res, next, id) => {
    try {
        const product = await Product.findById(id).exec();
        if (!product) {
            res.status(404).json({ success: false, message: "Product Not found" });
        }
        console.log("yes, there is a product with such id");
        req.id = id;
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "error occurred while searching for product", error });
    }
})

productRouter.route("/")
    .get(async (req, res) => {
        try {
            const products = await Product.find({}).populate('specifications');
            res.status(200).json({ success: true, data: products });
        } catch (err) {
            res.status(404).json({ success: false, message: "products not found", error });
        }
    })

productRouter.route("/:productId")
    .get(async (req, res) => {
        const { id } = req;
        try {
            const product = await Product.findById(id).populate('specifications');
            res.status(200).json({ success: true, data: product });
        } catch (error) {
            res.status(404).json({ success: false, message: "Data not found", error });
        }
    })
    .post(async (req, res) => {
        const { name, description, price, image } = req.body;
        try {
            const product = new Product({
                name: name,
                description: description,
                price: price,
                image: image
            })
            await product.save();
            res.status(201).json({ success: true, message: "successfully created", data: product });
        } catch (error) {
            res.status(500).json({ success: false, message: "failed to create entry product", error });
        }
    })
exports.productRouter = productRouter;