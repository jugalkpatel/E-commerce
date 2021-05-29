const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models/user.model");
const { cartRouter } = require("./cart.route");
const { wishlistRouter } = require("./wishlist.route");
const userRouter = express.Router();

userRouter.param("userId", async (req, res, next, id) => {
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
    res.status(500).json({
      success: false,
      message: "error occurred while searching for user",
    });
  }
});

userRouter.use("/:userId/cart", cartRouter);
userRouter.use("/:userId/wishlist", wishlistRouter);

userRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await User.find({});
      res.status(201).json({ success: true, data: users });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "error while getting users", error });
    }
  })
  .post(async (req, res) => {
    try {
      const { email, name, password } = req.body;
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email: email,
        name: name,
        password: encryptedPassword,
      });
      await user.save();
      res.status(201).json({
        success: true,
        message: "user created successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "error occurred while creating user",
        error,
      });
    }
  });

userRouter.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(403).json({
        success: false,
        message: "user validation failed: email is invalid",
      });
    }

    const check = await bcrypt.compare(password, user.password);

    if (check) {
      const populatedUser = await user
        .populate({
          path: "cart",
          select: "-__v -quantity",
          populate: {
            path: "products.product",
            select: "-__v -productId",
            populate: {
              path: "specifications",
              select: "-_id -__v -productId",
            },
          },
        })
        .populate({
          path: "wishlist",
          select: "-qunatity -__v",
          populate: {
            path: "products.product",
            select: "-__v -productId",
            populate: {
              path: "specifications",
              select: "-__v -_id -productId",
            },
          },
        })
        .execPopulate();

      res.status(201).json({
        success: true,
        message: "user is validated",
        data: populatedUser,
      });

      return;
    }

    res.status(403).json({
      success: false,
      message: "user validation failed: Password is invalid",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while searching for user.",
      error,
    });
  }
});

userRouter
  .route("/:userId")
  .get(async (req, res) => {
    try {
      const { user } = req;

      const populatedResponse = await user
        .populate({
          path: "cart",
          select: "-__v -quantity",
          populate: {
            path: "products.product specifications",
            select: "-_id -__v -productId",
          },
        })
        .populate({
          path: "wishlist",
          select: "-qunatity -__v",
          populate: {
            path: "products.product specifications",
            select: "-__v -_id -productId",
          },
        })
        .execPopulate();

      console.log(populatedResponse);

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {});

exports.userRouter = userRouter;
