const mongoose = require('mongoose')
const { Schema } = mongoose;

const specificationsSchema = new Schema({
    cooling: {
        type: String,
        required: [true, "Please Provide Cooling Mechanism"]
    },
    clockSpeed: {
        type: Number,
    },
    memory: {
        type: Number,
        required: [true, "Please Provide Memory Size"]
    },
    productId: {
        type: Schema.Types.ObjectId,
        unique: [true, "Please Provide unique product id"],
        required: [true, "There is no product with give id"],
        ref: 'Product'
    }

})

const Specification = mongoose.model('Specification', specificationsSchema);

exports.Specification = Specification;