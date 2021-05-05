const express = require('express');

const wishlistRouter = express.Router();

const mongoose = require('mongoose');

const { WishList } = require('../models/wishlist.model');
const { Product } = require('../models/product.model');
const { userRouter } = require('./user.route');

wishlistRouter.route('/')
    .get(async (req, res) => {
        const { id: userId } = req;
        console.log(userId);
        try {
            const wishlist = await WishList.findOne({ owner: userId }).exec();

            const populatedWishlist = await wishlist.
                populate({
                    path: 'products.product',
                    select: '-qunatity -__v',
                    populate: {
                        path: "specifications",
                        select: '-__v -_id -productId'
                    }
                })
                .execPopulate();

            res.status(201).json({
                success: true,
                data: populatedWishlist
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "error while getting wishlist",
                error
            })
        }
    })
    /* create new wishlist and add item to the wishlist */
    .post(async (req, res) => {
        const { id: productId } = req.body;
        const { id: userId, user } = req;
        try {

            const product = await Product.findById(productId);

            if (!product) {
                res.status(404).json({
                    success: false,
                    message: "there is no product with given id"
                });
                return;
            }


            if (user.wishlist) {
                const wishlist = await WishList.findOne({ owner: userId });

                wishlist.products.push({
                    product: productId
                });

                await wishlist.save();

                const populatedWishlist = await wishlist.
                    populate({
                        path: 'products.product',
                        select: '-qunatity -__v',
                        populate: {
                            path: "specifications",
                            select: '-__v -_id -productId'
                        }
                    })
                    .execPopulate();

                populatedWishlist.owner = undefined;

                res.status(201).json({
                    success: true,
                    message: "item is added to the wishlist",
                    data: populatedWishlist
                })


                return;
            }

            const wishlist = new WishList({
                owner: userId,
                products: [
                    { product: productId }
                ],
            })

            await wishlist.save();

            user.wishlist = wishlist
            await user.save();

            const populatedWishlist = await wishlist.
                populate({
                    path: 'products.product',
                    select: '-qunatity -__v',
                    populate: {
                        path: "specifications",
                        select: '-__v -_id -productId'
                    }
                })
                .execPopulate();
            populatedWishlist.owner = undefined;

            res.status(201).json({
                success: true,
                message: "wishlist is created",
                data: populatedWishlist
            })
        } catch (error) {
            res.status(500).json({
                success: true,
                message: "error while creating wishlist or add item to the wishlist",
                error
            })
        }
    })

wishlistRouter.route("/remove")
    .post(async (req, res) => {
        const { id: productId } = req.body;
        const { id: userId, user } = req;

        try {

            const product = await Product.findById(productId);

            if (!product) {
                res.status(404).json({
                    success: false,
                    message: "there is no product with given id"
                });
                return;
            }

            const wishlist = await WishList.findOne({ owner: userId });


            wishlist.products = wishlist.products.filter((item) => item.product.toString() !== productId);

            await wishlist.save()

            const populatedWishlist = await wishlist.
                populate({
                    path: 'products.product',
                    select: '-qunatity -__v',
                    populate: {
                        path: "specifications",
                        select: '-__v -_id -productId'
                    }
                })
                .execPopulate();
            populatedWishlist.owner = undefined;

            res.status(201).json({
                success: true,
                message: "wishlist is created",
                data: populatedWishlist
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "error while removing product",
                error
            })
        }
    });

exports.wishlistRouter = wishlistRouter;