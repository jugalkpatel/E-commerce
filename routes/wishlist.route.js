const express = require("express");

const wishlistRouter = express.Router();

const { WishList } = require("../models/wishlist.model");
const { Product } = require("../models/product.model");
const { validateToken } = require("../middlewares/validateToken");

wishlistRouter.use(validateToken);
wishlistRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const { wishlist: isWishListCreated } = req.user;

      if (!isWishListCreated) {
        res.status(200).json({
          success: true,
          message: "wishlist yet not created by user",
          products: [],
        });

        return;
      }

      const wishlist = await WishList.findById(isWishListCreated)
        .populate({
          path: "products.product",
          select: "-__v -quantity",
          populate: {
            path: "specifications",
            select: "-__id -__v -productId",
          },
        })
        .populate("specifications")
        .select("-__v");

      res.status(200).json({
        success: true,
        products: wishlist.products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "error while getting wishlist",
        error,
      });
    }
  })
  /* create new wishlist and add item to the wishlist */
  .post(async (req, res) => {
    try {
      const { id: productId } = req.body;
      const { id: userId, user } = req;
      const product = await Product.findById(productId);

      // console.log(productId);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "there is no product with given id",
        });
        return;
      }

      if (user.wishlist) {
        const wishlist = await WishList.findOne({ owner: userId });

        wishlist.products.push({
          product: productId,
        });

        await wishlist.save();

        const populatedWishlist = await wishlist
          .populate({
            path: "products.product",
            select: "-qunatity -__v",
            populate: {
              path: "specifications",
              select: "-__v -_id -productId",
            },
          })
          .execPopulate();

        populatedWishlist.owner = undefined;

        res.status(201).json({
          success: true,
          message: "item is added to the wishlist",
          data: populatedWishlist,
        });

        return;
      }

      const wishlist = new WishList({
        owner: userId,
        products: [{ product: productId }],
      });

      await wishlist.save();

      user.wishlist = wishlist;
      await user.save();

      const populatedWishlist = await wishlist
        .populate({
          path: "products.product",
          select: "-qunatity -__v",
          populate: {
            path: "specifications",
            select: "-__v -_id -productId",
          },
        })
        .execPopulate();
      populatedWishlist.owner = undefined;

      res.status(201).json({
        success: true,
        message: "wishlist is created",
        data: populatedWishlist,
      });
    } catch (error) {
      console.log({ error });
      res.status(500).json({
        success: false,
        message: "error while creating wishlist or add item to the wishlist",
        error,
      });
    }
  });

wishlistRouter.route("/remove").post(async (req, res) => {
  const { id: productId } = req.body;
  const { id: userId } = req;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "there is no product with given id",
      });
      return;
    }

    const wishlist = await WishList.findOne({ owner: userId });

    wishlist.products = wishlist.products.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();

    const populatedWishlist = await wishlist
      .populate({
        path: "products.product",
        select: "-quantity -__v",
        populate: {
          path: "specifications",
          select: "-__v -_id -productId",
        },
      })
      .execPopulate();

    res.status(201).json({
      success: true,
      message: "wishlist is created",
      data: populatedWishlist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error while removing product",
      error,
    });
  }
});

exports.wishlistRouter = wishlistRouter;