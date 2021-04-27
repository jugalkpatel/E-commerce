const mongoose = require('mongoose')
const { Schema } = mongoose;

const specificationsSchema = new Schema({
    cooling: {
        type: String,
        required: [true, "Please Provide Cooling Mechanism"]
    },
    clockSpeed: {
        type: Number,
        required: [true, "Please Provide Clock speed"]
    },
    memory: {
        type: Number,
        required: [true, "Please Provide Memory Size"]
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const Specification = mongoose.model('Specification', specificationsSchema);

exports.Specification = Specification;