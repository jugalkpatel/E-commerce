const express = require('express');

const wishlistRouter = express.Router();

const mongoose = require('mongoose');

const { WishList } = require('../models/wishlist.model');
const { Product } = require('../models/product.model');
const { userRouter } = require('./user.route');

wishlistRouter.param('wishlistId', async (req, res, next, id) => {
    try {
        const wishlist = await WishList.findById(id);
        if (!wishlist) {
            res.status(404).json({
                success: false,
                message: "wishlist not available",
            })
        }
        req.wishlist = wishlist;
        next();
    } catch (err) {
        res.staus(500).json({
            success: false,
            message: "error while searching wishlist",
            error
        })
    }
})

wishlistRouter.route('/')
    .get(async (req, res) => {
        const { id: userId } = req;
        console.log(userId);
        try {
            const wishlist = await WishList.findOne({ owner: userId }).exec();
            console.log(wishlist);
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "error while getting wishlist",
                error
            })
        }
    })
    .post(async (req, res) => {
        const { name, product } = req.body;
        const { user } = req;
        try {
            const wishlist = new WishList({
                name: name,
                owner: user,
                products: [
                    { product }
                ],
            })

            await wishlist.save();

            user.wishlist = wishlist
            await user.save();

            const populatedWishlist = await wishlist.populate({
                path: 'products.product',
                populate: { path: "specifications" }
            }).execPopulate();

            populatedWishlist.owner = undefined;

            console.log(populatedWishlist);

            res.status(201).json({
                success: true,
                message: "wishlist is created",
                data: populatedWishlist
            })
        } catch (error) {
            res.status(500).json({
                success: true,
                message: "error while creating wishlist",
                error
            })
        }
    })

wishlistRouter.route("/:wishlistId/add")
    .post(async (req, res) => {
        try {
            const { wishlistId, productId } = req.body;

            const { wishlist } = req;

            if (wishlistId === wishlist.id) {
                wishlist.products.push({ product: productId })
            }

            await wishlist.save();

            const populatedWishlist = await wishlist.populate({
                path: 'products.product',
                populate: { path: "specifications" }
            }).execPopulate();

            populatedWishlist.owner = undefined;

            console.log(populatedWishlist);

            res.status(201).json({
                success: true,
                message: "item is added to the wishlist",
                data: populatedWishlist
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "error while adding item to the wishlist",
                error
            })
        }
    })

wishlistRouter.route("/:wishlistId/remove")
    .post(async (req, res) => {
        try {
            /**
             * handle productId undefined case
             */
            const { productId } = req.body;

            const { wishlist } = req;

            wishlist.products = wishlist.products.filter((item) => item.product.toString() !== productId);

            await wishlist.save()

            const populatedWishlist = await wishlist.populate({
                path: 'products.product',
                populate: { path: "specifications" }
            }).execPopulate();

            populatedWishlist.owner = undefined;


            res.status(201).json({
                success: true,
                message: "item is added to the wishlist",
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