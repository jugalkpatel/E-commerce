const mongoose = require('mongoose');

const { Schema } = mongoose;

const wishListSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Provide WishList Name"]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                unique: true
            }
        }
    ]
})

const WishList = mongoose.model("WishList", wishListSchema);
exports.WishList = WishList;