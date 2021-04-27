const express = require('express');

const mongoose = require('mongoose');

const { User } = require('../models/user.model');

const userRouter = express.Router();

userRouter.param('userId', async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec();
        if (!user) {
            res.stats(404).json({ success: false, message: "user not found" });
        }
        console.log("yes, there is someone with given id");
        req.id = id;
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "error occurred while searching for user" });
    }
})

userRouter.route("/")
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
    .get((req, res) => {
        res.send("wiring is working");
    })

userRouter.route('/:userId')
    .get(async (req, res) => {
        res.send("sab first class hai");
    })
    .post(async (req, res) => {
        res.send("this is for updating user")
    })

exports.userRouter = userRouter;