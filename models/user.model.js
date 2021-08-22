const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
    min: [2, "user name should be greater than 2 chars"],
    max: [25, "user name should be lesser than 25 chars"],
    trim: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    min: [8, "password must be greater than 8 chars"],
    trim: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  wishlist: {
    type: Schema.Types.ObjectId,
    ref: "WishList",
  },
  addresses: {
    type: Schema.Types.ObjectId,
  },
});

const User = mongoose.model("User", userSchema);
exports.User = User;
