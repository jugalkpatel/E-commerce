const express = require("express");
const manufacturerRouter = express.Router();
const { Manufacturer } = require("../models/manufacturers.model");

manufacturerRouter.get("/", async (req, res) => {
  try {
    const companies = await Manufacturer.find({}).select("-__v");

    res.status(201).json({
      success: true,
      message: "manufacturer fetched successfully",
      companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while searching for manufacturers",
    });
  }
});

manufacturerRouter.post("/addManufacturer", async (req, res) => {
  try {
    const { companies } = req.body;

    const manufacturerList = companies.map((company) => {
      return {
        manufacturer: company,
      };
    });

    const manufacturers = await Manufacturer.insertMany(manufacturerList);

    res.status(201).json({
      success: true,
      message: "Manufacturers added successfully",
      manufacturers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error occured while adding manufacturers",
      error,
    });
  }
});

module.exports = { manufacturerRouter };
