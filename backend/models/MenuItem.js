const mongoose = require('mongoose');
const Restaurant = require('./Restaurant');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    category: {
        type: String,
        required: true,
    },
    Restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);