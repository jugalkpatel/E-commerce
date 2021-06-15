const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: [1, "quantity can not be zero"],
      },
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

exports.Cart = Cart;
