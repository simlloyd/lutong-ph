const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');

const addToCart = async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;

        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        if (!menuItem.isAvailable) {
            return res.status(400).json({ message: 'Menu item not available' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (cart && cart.restaurant.toString() !== menuItem.restaurant.toString()) {
            return res.status(400).json({
                message: 'Your cart has item from another restaurant. Clear your cart first.',
                conflict: true
            });
        }

        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                restaurant: menuItem.restaurant,
                items: []
            });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.menuItem.toString() === menuItemId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ menuItem: menuItemId, quantity });
        }

        const savedCart = await cart.save();
        res.json(savedCart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
        .populate('items.menuItem')
        .populate('restaurant');

        if (!cart) {
            return res.json({ item: [], restaurant: null });
        }

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            (item) => item.menuItem.toString() !== req.params.menuItemId
        );

        if (cart.items.length === 0) {
            await Cart.findByIdAndDelete(cart._id);
            return res.json({ message: 'Cart cleared', items: [] });
        }

        const saveCart = await cart.save();
        res.json(saveCart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.user._id });
        res.json({ message: 'Cart cleared successfully' });
    } catch (err) {
        res.status(500).json({ message: err.messaage });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart,
};