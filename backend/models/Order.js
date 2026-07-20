const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
                required: true,
            },
            priceAtPurchase: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Placed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
        default: 'Placed',
    },
    paymentMethod: {
        type: String,
        enum: ['Cash on Delivery', 'GCash'],
        default: 'Cash on Delivery',
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);