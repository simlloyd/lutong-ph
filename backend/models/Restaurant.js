const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    deliveryfee: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);