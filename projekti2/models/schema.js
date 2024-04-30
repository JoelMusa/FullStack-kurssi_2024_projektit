
const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            default: 0,
        },

        price: {
            type: Number,
            required: true,
            default: 0,
        },

    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Product', ProductSchema);
