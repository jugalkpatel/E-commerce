const express = require("express");
const productRouter = express.Router();
const { Product } = require("../models/product.model");
const mongoose = require("mongoose");
const { Schema } = mongoose;

productRouter.param("productId", async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).exec();
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product Not found",
      });
    }
    console.log("yes, there is a product with such id");
    req.id = id;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error occurred while searching for product",
      error,
    });
  }
});

productRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({})
        .select("-__v")
        .populate("specifications", "cooling clockSpeed memory -_id");

      res.status(201).json({
        success: true,
        products: products,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "products not found",
        error,
      });
    }
  })
  .post(async (req, res) => {
    const { name, description, price, image, quantity } = req.body;
    try {
      const product = new Product({
        name: name,
        description: description,
        price: price,
        image: image,
        quantity: quantity,
      });
      await product.save();
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "failed to create entry product",
        error,
      });
    }
  });

productRouter.route("/:productId").get(async (req, res) => {
  const { id } = req;
  try {
    const product = await Product.findById(id).populate("specifications");
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, message: "Data not found", error });
  }
});

productRouter.route("/fields").post(async (req, res) => {
  try {
    const { id, link } = req.body;

    console.log(id, link);

    const result = await Product.findByIdAndUpdate(
      id,
      { $set: { link: link } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "new field added successfully",
      product: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error while adding new field to Products",
    });
  }
});

exports.productRouter = productRouter;
