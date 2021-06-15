const mongoose = require("mongoose");

const { Schema } = mongoose;

const wishListSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    trim: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        unique: true,
        require: true,
      },
    },
  ],
});

const WishList = mongoose.model("WishList", wishListSchema);
exports.WishList = WishList;
