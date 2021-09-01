const express = require("express");
const { Manufacturer } = require("../models/manufacturers.model");
const productRouter = express.Router();
const { Product } = require("../models/product.model");

productRouter.param("productId", async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).exec();
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product Not found",
      });
    }
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
        .populate("specifications", "cooling clockSpeed memory -_id")
        .select("-__v");

      const manufacturers = await Manufacturer.find({}).select("-__v");

      res.status(201).json({
        success: true,
        products,
        manufacturers,
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

productRouter.get("/:productId", async (req, res) => {
  const { id } = req;

  try {
    const product = await Product.findById(id).populate("specifications");

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, message: "Data not found", error });
  }
});

productRouter.post("/fields", async (req, res) => {
  try {
    const { id, link } = req.body;

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
    res.status(500).json({
      success: false,
      message: "error while adding new field to Products",
    });
  }
});

productRouter.post("/removeField", async (req, res) => {
  try {
    await Product.updateMany({}, { $unset: { quantity: "" } });

    res.status(201).json({
      sucecss: true,
      message: "field are removed successfully",
    });
  } catch (error) {
    console.error("failed to remove field");
  }
});

productRouter.post("/addField", async (req, res) => {
  try {
    await Product.updateMany(
      {},
      {
        $set: {
          manufacturer: "nvidea",
        },
      }
    );

    res.status(201).json({
      sucecss: true,
      message: "fields are added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while adding new fields",
    });
  }
});

productRouter.post("/updateManufacturer", async (req, res) => {
  try {
    const { id: productID, manufacturer } = req.body;

    const product = await Product.findByIdAndUpdate(
      { _id: productID },
      { manufacturer },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "manfacturer updated successfully",
      product,
    });
  } catch (error) {
    console.log("error occured while updating ", error);
  }
});

exports.productRouter = productRouter;
