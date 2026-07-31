const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find({
            restaurant: req.params.restaurantId
        });
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createMenuItem = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        if (restaurant.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied - you do not own this restaurant'});
        }

        const menuItem = new MenuItem({
            ...req.body,
            restaurant: req.params.restaurantId,
        });

        const savedMenuItem = await menuItem.save();
        res.status(201).json(savedMenuItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);

        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        const restaurant = await Restaurant.findById(menuItem.restaurant);

        if (restaurant.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied - you do not own this restaurant' });
        }

        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            req.body.id,
            req.body,
            { new: true, runVlaidators: true }
        );

        res.json(updatedMenuItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);

        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        const restaurant = await Restaurant.findById(menuItem.restaurant);

        if (restaurant.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied - you do not own this restaurant' });
        }

        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
};