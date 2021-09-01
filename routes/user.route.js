const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRouter = express.Router();

const { User } = require("../models/user.model");
const { cartRouter } = require("./cart.route");
const { wishlistRouter } = require("./wishlist.route");

userRouter.param("userId", async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      res.stats(404).json({ success: false, message: "user not found" });
    }
    req.id = id;
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error occurred while searching for user",
      error,
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
        mail: email,
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
      res.status(404).json({
        success: false,
        message: "user not exists",
      });
      return;
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      res.status(404).json({
        success: false,
        message: "user validation failed: Email or Password is invalid",
      });
      return;
    }

    const token = jwt.sign({ uname: user.name }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(201).json({
      success: true,
      token: token,
      userID: user._id,
      userName: user.name,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error while searching for user",
      error,
    });
  }
});

userRouter.route("/signup").post(async (req, res) => {
  try {
    const { uname, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const user = new User({
      name: uname,
      email: email,
      password: await bcrypt.hash(password, salt),
    });

    await user.save();

    const token = jwt.sign({ uname: uname }, process.env.SECRET_KEY, {
      expiresIn: "72h",
    });

    res.status(201).json({
      success: true,
      message: "user created successfully",
      token: token,
      userID: user._id,
      userName: user.name,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while creating user",
      error,
    });
  }
});

/* not for user */
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

      res.status(201).json({
        success: true,
        data: populatedResponse,
      });
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {});

exports.userRouter = userRouter;
