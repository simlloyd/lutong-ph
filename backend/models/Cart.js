const mongoose = require('mongoose');
const Restaurant = require('./Restaurant');
const MenuItem = require('./MenuItem');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MenuItem',
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);