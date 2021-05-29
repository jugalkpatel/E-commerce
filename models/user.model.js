const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-type-email");
mongoose.SchemaTypes.Email.defaults.message = "Email Address is invalid";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
    min: [2, "user name should be greater than 2 chars"],
    max: [25, "user name should be lesser than 25 chars"],
    trim: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    lowercase: true,
    unique: true,
    required: true,
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
    ref: "Address",
  },
});

const User = mongoose.model("User", userSchema);
exports.User = User;
