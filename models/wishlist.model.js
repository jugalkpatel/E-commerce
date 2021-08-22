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
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

wishListSchema.index({ products: 1 }, { unique: true });

const WishList = mongoose.model("WishList", wishListSchema);
exports.WishList = WishList;
