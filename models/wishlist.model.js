const mongoose = require("mongoose");

const { Schema } = mongoose;

const wishListSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    trim: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        require: true,
      },
    },
  ],
});

const WishList = mongoose.model("WishList", wishListSchema);
exports.WishList = WishList;
