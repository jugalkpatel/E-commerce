const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { User } = require('../models/user.model');
const { cartRouter } = require('./cart.route');
const { wishlistRouter } = require('./wishlist.route');
const userRouter = express.Router();


userRouter.param('userId', async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec();
        if (!user) {
            res.stats(404).json({ success: false, message: "user not found" });
        }
        console.log("yes, there is someone with given id");
        req.id = id;
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "error occurred while searching for user" });
    }
})

userRouter.use('/:userId/cart', cartRouter);
userRouter.use('/:userId/wishlist', wishlistRouter);

userRouter.route("/")
    .get(async (req, res) => {
        try {
            const users = await User.find({});
            res.status(201).json({ success: true, data: users });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "error while getting users", error });
        }
    })
    .post(async (req, res) => {
        const { name, password } = req.body;
        try {
            const user = new User({
                name: name,
                password: password
            })
            await user.save();
            res.status(201).json({ success: true, message: "user created successfully", data: user });
        } catch (error) {
            res.status(500).json({ success: false, message: "error occurred while creating user", error });
        }
    })

userRouter.route('/:userId')
    .get(async (req, res) => {
        res.send("get specific user here");
    })
    .post(async (req, res) => {
        res.send("Implement Update password here")
    })

exports.userRouter = userRouter;