const express = require("express");

const cartRouter = express.Router();

const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");

cartRouter
  .route("/")
  .get(async (req, res) => {
    const userId = req.id;
    console.log(userId);
    try {
      const cart = await Cart.findOne({ userId: userId }).exec();

      if (!cart) {
        res.status(404).json({
          success: true,
          message: "cart yet not created by user",
          data: [],
        });

        return;
      }

      const populatedCart = await Cart.findOne({ userId }).populate({
        path: "products.product",
        select: "-__v -quantity",
        populate: {
          path: "specifications",
          select: "-_id -__v -productId",
        },
      });

      res.status(200).json({ success: true, data: populatedCart });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "there is no cart associated with user",
        error,
      });
    }
  })
  /* create cart or add item to the cart */
  .post(async (req, res) => {
    const { id: productId } = req.body;
    const { id: userId, user } = req;
    console.log(productId, userId);
    try {
      const product = await Product.findById(productId);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "there is no product with given id",
        });
        return;
      }

      // add item case: if cart is already created then.
      if (user.cart) {
        const cart = await Cart.findOne({ owner: userId });
        console.log(cart);

        cart.products.push({ product: product });

        await cart.save();

        const populatedCart = await cart
          .populate({
            path: "products.product",
            select: "-__v -quantity",
            populate: {
              path: "specifications",
              select: "-productId -_id -__v",
            },
          })
          .execPopulate();

        res.status(201).json({
          success: true,
          message: "item is added to the cart",
          data: populatedCart,
        });

        return;
      }

      const cart = new Cart({
        products: [{ product: product._id }],
        owner: userId,
      });

      await cart.save();
      user.cart = cart;

      // product.quantity = product.quantity - 1;
      // await product.save();

      await user.save();

      const populatedCart = await cart
        .populate({
          path: "products.product",
          select: "-__v -quantity",
          populate: {
            path: "specifications",
            select: "-productId -_id -__v",
          },
        })
        .execPopulate();

      res.status(201).json({
        success: true,
        message: "cart created successfully",
        data: populatedCart,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "failed to create cart or item is not added to the cart",
        error,
      });
    }
  });

/* get specific cart by card id */
cartRouter.route("/:cartId").get(async (req, res) => {
  const { id, cart } = req;
  const populatedCart = await cart
    .populate({
      path: "products.product",
      populate: { path: "specifications" },
    })
    .execPopulate();
  res.status(201).json({
    success: true,
    data: populatedCart,
  });
});

/* remove item from cart */
cartRouter.route("/remove").post(async (req, res) => {
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

    const cart = await Cart.findOne({ owner: userId });

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const populatedCart = await cart
      .populate({
        path: "products.product",
        select: "-__v -quantity",
        populate: {
          path: "specifications",
          select: "-productId -_id -__v",
        },
      })
      .execPopulate();

    res.status(201).json({
      success: true,
      message: "item is successfully removed from cart",
      data: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while removing item from cart",
      error,
    });
  }
});

/* update quantity in cart */
cartRouter.route("/update").post(async (req, res) => {
  const { id: userId } = req;
  const { id: productId, quantity } = req.body;
  console.log(productId, quantity);
  try {
    const cart = await Cart.findOne({ owner: userId });

    cart.products.forEach((item) => {
      if (item.product.toString() === productId) {
        item.quantity = quantity;
      }
    });

    await cart.save();

    const populatedCart = await cart
      .populate({
        path: "products.product",
        select: "-__v -quantity",
        populate: {
          path: "specifications",
          select: "-productId -_id -__v",
        },
      })
      .execPopulate();

    res.status(201).json({
      success: true,
      messasge: "Quantity is updates Successfully",
      data: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while updating quantity in cart",
      error,
    });
  }
});
exports.cartRouter = cartRouter;
