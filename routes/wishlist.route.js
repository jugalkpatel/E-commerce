const express = require("express");

const wishlistRouter = express.Router();

const { WishList } = require("../models/wishlist.model");
const { Product } = require("../models/product.model");
const { validateToken } = require("../middlewares/validateToken");

wishlistRouter.use(validateToken);
wishlistRouter.route("/").get(async (req, res) => {
  try {
    const { wishlist: isWishListCreated } = req.user;

    if (!isWishListCreated) {
      res.status(201).json({
        success: true,
        message: "wishlist yet not created by user",
        products: [],
      });

      return;
    }

    const wishlist = await WishList.findById(isWishListCreated)
      .populate({
        path: "products",
        select: "-__v -quantity",
        populate: {
          path: "specifications",
          select: "-__id -__v -productId",
        },
      })
      .populate("specifications")
      .select("-__v");

    res.status(201).json({
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
});

/* create new wishlist and add item to the wishlist */
wishlistRouter.post("/add", async (req, res) => {
  try {
    const { id: productId } = req.body;
    const { id: userId, user } = req;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "there is no product with given id",
      });
      return;
    }

    if (user.wishlist) {
      const wishlist = await WishList.findOneAndUpdate(
        { owner: userId },
        { $addToSet: { products: productId } },
        { new: true }
      );

      await WishList.populate(wishlist, {
        path: "products",
        select: "-quantity -__v",
        populate: {
          path: "specifications",
          select: "-__v -_id -productId",
        },
      });

      res.status(201).json({
        success: true,
        message: "Product Added Successfully",
        product: wishlist.products.slice(-1)[0],
      });

      return;
    }

    const wishlist = new WishList({
      owner: userId,
      products: [productId],
    });

    await wishlist.save();

    user.wishlist = wishlist;

    await user.save();

    await WishList.populate(wishlist, {
      path: "products",
      select: "-__v -quantity",
      populate: {
        path: "specifications",
        select: "-__v -_id -productId",
      },
    });

    res.status(201).json({
      success: true,
      message: "wishlist is created",
      product: wishlist.products.slice(-1)[0],
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

    await WishList.findOneAndUpdate(
      { owner: userId },
      { $pull: { products: productId } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Product Removed Successfully",
      product: productId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "failed to remove product from wishlist",
      error,
    });
  }
});

exports.wishlistRouter = wishlistRouter;
