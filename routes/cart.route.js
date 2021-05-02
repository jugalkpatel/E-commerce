const { Router } = require('express');
const express = require('express');
const { propertyOf } = require('lodash');

const cartRouter = express.Router();

const mongoose = require('mongoose');

const { Cart } = require('../models/cart.model');
const { Product } = require('../models/product.model');

cartRouter.param('cartId', async (req, res, next, id) => {
    try {
        const cart = await Cart.findById(id).exec();
        if (!cart) {
            res.status(404).json({
                success: false,
                message: "cart not found"
            });
        }
        console.log("yes, there is some cart with given id");
        req.id = id;
        req.cart = cart;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error occurred while searching for cart"
        });
    }
})

cartRouter.route("/")
    .get(async (req, res) => {
        const userId = req.id;
        console.log(userId);
        try {
            const cart = await Cart.findOne({ userId }).populate({
                path: 'products.product',
                populate: { path: 'specifications' }
            });

            if (!cart) {
                res.status(404).json({
                    success: false,
                    message: 'cart not found'
                });
            }
            /**
             * TODO: Normalize response: add quantity to the product instead it being seperate.
             * 
             */
            res.status(200).json({ success: true, data: cart });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: 'there is no cart associated with user',
                error
            });
        }

    })
    .post(async (req, res) => {
        const { id: productId, quantity } = req.body;
        const { id: userId, user } = req;
        try {
            const product = await Product.findById(productId);

            if (!product) {
                res.status(404).json({
                    success: false,
                    message: "there is no product with given id"
                });
            }

            const cart = new Cart({
                products: {
                    product: product._id,
                },
                userId
            });

            await cart.save();
            user.cart = cart;
            await user.save();

            const populatedCart = await cart.populate({
                path: 'products.product',
                populate: { path: "specifications" }
            }).execPopulate();


            res.status(201).json({
                success: true,
                message: "cart created successfully",
                data: populatedCart
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "failed to create cart",
                error
            });
        }
    })

/* get specific cart by card id */
cartRouter.route("/:cartId")
    .get(async (req, res) => {
        const { id, cart } = req;
        /**
         * TODO: SEND POPULATED CART
         */
        const populatedCart = await cart.populate({
            path: 'products.product',
            populate: { path: "specifications" }
        }).execPopulate();
        res.status(201).json({
            success: true,
            data: populatedCart
        });
    })


/* add item in cart */
cartRouter.route("/:cartId/add")
    .post(async (req, res) => {
        const { id: productId } = req.body
        try {
            const cart = req.cart;
            cart.products.push({ product: productId });
            await cart.save();

            const populatedCart = await cart.populate({
                path: 'products.product',
                populate: { path: "specifications" }
            }).execPopulate();

            res.status(201).json({
                success: true,
                message: "succesfully added to the cart",
                data: populatedCart
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "error while adding item to the cart",
                error
            })
        }
    })

/* remove item from cart */
cartRouter.route("/:cartId/remove")
    .post(async (req, res) => {
        const { id: productId } = req.body;
        try {
            const cart = req.cart;
            cart.products = cart.products.filter((item) => item.product.toString() !== productId);

            await cart.save();

            const populatedCart = await cart.populate({
                path: 'products.product',
                populate: { path: "specifications" }
            }).execPopulate();

            res.status(201).json({
                success: true,
                message: "item is successfully removed from cart",
                data: populatedCart
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "error while removing item from cart",
                error
            })
        }
    })


/* update quantity in cart */
cartRouter.route("/:cartId/update")
    .post(async (req, res) => {
        const { id: productId, quantity } = req.body;
        try {
            const cart = req.cart;
            cart.products.forEach((item) => {
                if (item.product.toString() === productId) {
                    item.quantity = quantity;
                }
            })

            await cart.save();

            const populatedCart = await cart.populate({
                path: 'products.product',
                populate: { path: "specifications" }
            }).execPopulate();

            res.status(201).json({
                success: true,
                messasge: "Quantity is updates Successfully",
                data: populatedCart
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "error while updating quantity in cart",
                error
            });
        }
    })
exports.cartRouter = cartRouter;