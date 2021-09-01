const express = require("express");
const specRouter = express.Router();
const { Specification } = require("../models/specifications.model");
const { Product } = require("../models/product.model");

specRouter.param("productId", async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).exec();
    if (!product) {
      res.status(404).json({ success: false, message: "No such Product" });
    }
    req.id = id;
    req.product = product;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "there is not product with given id",
      error,
    });
  }
});

specRouter.route("/:productId").post(async (req, res) => {
  const { id, product } = req;
  const { cooling, clockspeed, memory } = req.body;
  try {
    const spec = new Specification({
      cooling: cooling,
      clockSpeed: clockspeed,
      memory: memory,
      productId: id,
    });

    await spec.validate();

    await spec.save();

    product.specifications = spec;
    await product.save();
    res.status(201).json({
      success: true,
      message: "specification created successfully",
      data: spec,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to create entry for specification",
      error,
    });
  }
});

exports.specRouter = specRouter;
