const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-type-url");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Product Description is Required"],
    maxLength: [200, "Only 100 Chars are allowed"],
  },
  price: {
    type: Number,
    required: [true, "Product Price is required"],
  },
  image: {
    type: mongoose.SchemaTypes.Url,
    required: [true, "Please Provide Url for Product"],
  },
  quantity: {
    type: Number,
    require: [true, "Please Provide quantity for Product"],
  },
  specifications: {
    type: Schema.Types.ObjectId,
    ref: "Specification",
  },
});

const Product = mongoose.model("Product", productSchema);
exports.Product = Product;

