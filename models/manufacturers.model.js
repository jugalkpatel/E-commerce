const mongoose = require("mongoose");
const { Schema } = mongoose;

const manufacturerSchema = new Schema({
  manufacturer: {
    type: String,
    required: [true, "manufacturer is required"],
    trim: true,
  },
});

const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);
module.exports = { Manufacturer };
