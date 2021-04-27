const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
        quantity: {
            type: Number,
            required: [true, "quantity is required"],
            default: 1
        }
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Cart = mongoose.model('Cart', cartSchema);

exports.Cart = Cart;