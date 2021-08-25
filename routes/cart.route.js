const express = require("express");

const cartRouter = express.Router();

const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");
const { User } = require("../models/user.model");
const { validateToken } = require("../middlewares/validateToken");

cartRouter.use(validateToken);
cartRouter.get("/", async (req, res) => {
  try {
    const { cart: cartID } = req.user;

    if (!cartID) {
      res.status(201).json({
        success: true,
        message: "cart yet not created by user",
        products: [],
      });

      return;
    }

    const cart = await Cart.findById(cartID);

    await Cart.populate(cart, {
      path: "products.product",
      select: "-__v -quantity",
      populate: {
        path: "specifications",
        select: "-productId -_id -__v",
      },
    });

    const resCart = cart.products.map(({ product, quantity }) => {
      return { ...product._doc, quantity };
    });

    res.status(201).json({
      success: true,
      products: resCart,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "there is no cart associated with user",
      error,
    });
  }
});

/* create cart or add item to the cart */
cartRouter.post("/add", async (req, res) => {
  try {
    const { id: productId } = req.body;
    const { id: userId, user } = req;
    console.log({ productId, userId });

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "there is no product with given id",
      });
      return;
    }

    if (user.cart) {
      const cart = await Cart.findOneAndUpdate(
        {
          owner: userId,
        },
        { $addToSet: { products: { product: productId } } },
        { new: true }
      );

      await Cart.populate(cart, {
        path: "products.product",
        select: "-__v -quantity",
        populate: {
          path: "specifications",
          select: "-productId -_id -__v",
        },
      });

      const resProduct = cart.products.slice(-1)[0];

      res.status(201).json({
        success: true,
        message: "Product is Successfully added to the cart",
        product: { ...resProduct.product._doc, quantity: resProduct.quantity },
      });

      return;
    }

    const cart = new Cart({
      products: [{ product: productId }],
      owner: userId,
    });

    await cart.save();

    await User.findByIdAndUpdate(userId, { cart: cart });

    await Cart.populate(cart, {
      path: "products.product",
      select: "-__v -quantity",
      populate: {
        path: "specifications",
        select: "-productId -_id -__v",
      },
    });

    const resProduct = cart.products.slice(-1)[0];

    res.status(201).json({
      success: true,
      message: "Product is successfully added to the cart",
      product: { ...resProduct.product._doc, quantity: resProduct.quantity },
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

/* remove item from cart */
cartRouter.post("/remove", async (req, res) => {
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

    await Cart.findOneAndUpdate(
      {
        owner: userId,
      },
      { $pull: { products: { product: productId } } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "product successfully removed from cart",
      product: productId,
    });
  } catch (error) {
    console.log(error);
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
