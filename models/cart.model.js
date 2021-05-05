const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                unique: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: [1, 'quantity can not be zero']
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