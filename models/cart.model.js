const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }
})

const Cart = mongoose.model('Cart', cartSchema);

exports.Cart = Cart;