const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

const placeOrder = async (req, res) => {
    try {
        const { deliveryAddress, paymentMethod } = req.body;

        const cart = await Cart.findOne({ user: req.user._id })
        .populate('items.menuItem');

        if (!cart || cart.items.lenght === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        const restaurant = await Restaurant.findById(cart.restaurant);

        const orderItems = cart.items.map((item) => ({
            menuItem: item.menuItem._id,
            quantity: item.quantity,
            priceAtPurchase: item.menuItem.price,
        }));

        const totalAmount = orderItems.reduce((total, item) => {
            return total + item.priceAtPurchase * item.quantity;
        }, 0);

        const order = new Order({
            user: req.user._id,
            restaurant: cart.restaurant,
            items: orderItems,
            totalAmount,
            deliveryFee: restaurant.deliveryFee,
            deliveryAddress,
            paymentMethod: paymentMethod || 'Cash on Delivery',
        });

        const savedOrder = await order.save();

        await Cart.findByIdAndDelete(cart._id);

        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        .populate('items.menuItem')
        .populate('restaurant', 'name address image')
        .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOneOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate('items.menuItem')
        .populate('restaurant', 'name address image phone');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        let query = {};

        if (req.user.role === 'restuarant_owner') {
            const restaurants = await Restaurant.find({ owner: req.user._id });
            const restaurantIds = restaurants.map(r => r._id);
            query = { restaurant: { $in: restaurantIds } };
        }

        const orders = await Order.find(query)
            .populate('items.menuItem')
            .populate('restaurant', 'name address')
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        const savedOrder = await order.save();
        res.json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getOneOrder,
    getAllOrders,
    updateOrderStatus,
};