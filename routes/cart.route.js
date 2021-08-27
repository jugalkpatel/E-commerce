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

cartRouter.use(async (req, res, next) => {
  try {
    const { id: productId } = req.body;

    const product = await Product.findById(productId);

    req.product = product;

    console.log({ product });

    next();
  } catch (error) {
    res.status(404).json({
      success: true,
      message: "product is not available",
    });
  }
});

/* create cart or add item to the cart */
cartRouter.post("/add", async (req, res) => {
  try {
    const { id: productId } = req.body;
    const { id: userId, user, product } = req;

    const totalQuantity = await decrementTotalQuantity(product);

    if (!totalQuantity) {
      res.status(500).json({
        success: false,
        message: "error while updating total quantity",
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
        totalQuantity,
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
      totalQuantity,
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
  const { id: userId, product } = req;

  try {
    const cart = await Cart.findOneAndUpdate(
      {
        owner: userId,
      },
      { $pull: { products: { product: productId } } },
      { new: false }
    );

    const removedProduct = cart.products.find((item) => {
      return JSON.stringify(item.product) === JSON.stringify(product._id);
    });

    product.quantity = product.quantity + removedProduct.quantity;

    await product.save();

    res.status(201).json({
      success: true,
      message: "product successfully removed from cart",
      product: productId,
      totalQuantity: product.quantity,
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
cartRouter.post("/update/increment", async (req, res) => {
  try {
    const { id: userId, product } = req;
    const { id: productId } = req.body;

    /* decrementing total quantity */
    const totalQuantity = await decrementTotalQuantity(product);

    if (totalQuantity < 0) {
      res.status(500).json({
        success: false,
        message: "error while updating total quantity",
      });
      return;
    }

    await Cart.findOneAndUpdate(
      {
        owner: userId,
        "products.product": productId,
      },
      {
        $inc: { "products.$.quantity": 1 },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "cart quantity updated successfully",
      product: productId,
      totalQuantity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while updating quantity in cart",
      error,
    });
  }
});

cartRouter.post("/update/decrement", async (req, res) => {
  try {
    const { id: userId, product } = req;
    const { id: productId } = req.body;

    /* incrementing total quantity */
    const totalQuantity = await incrementTotalQuantity(product);

    if (totalQuantity < 0) {
      res.status(500).json({
        success: false,
        message: "error while updating total quantity",
      });
      return;
    }

    await Cart.findOneAndUpdate(
      {
        owner: userId,
        "products.product": productId,
        "products.$.quantity": { $gt: 1 },
      },
      {
        $inc: { "products.$.quantity": -1 },
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      message: "cart quantity updated successfully",
      product: productId,
      totalQuantity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while updating quantity in cart",
      error,
    });
  }
});

const incrementTotalQuantity = async ({ _id }) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        $and: [{ _id }, { quantity: { $gte: 0 } }],
      },
      {
        $inc: { quantity: 1 },
      },
      { new: true }
    );

    return product.quantity;
  } catch (error) {
    return false;
  }
};

const decrementTotalQuantity = async ({ _id }) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        $and: [{ _id }, { quantity: { $gt: 0 } }],
      },
      {
        $inc: { quantity: -1 },
      },
      { new: true }
    );

    return product.quantity;
  } catch (error) {
    return -1;
  }
};

exports.cartRouter = cartRouter;
