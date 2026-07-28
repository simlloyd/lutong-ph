const Restaurant = require('../models/Restaurant');

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
            .populate('owner', 'name email')
            .sort({ createdAt: -1 });

        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
            .populate('owner', 'name email');

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createRestaurant = async (req, res) => {
    try {
        const { name, address, phone, cuisine, image, deliveryFee } = req.body;

        const restaurant = new Restaurant({
            name,
            address,
            phone,
            cuisine,
            image,
            deliveryFee,
            owner: req.user._id,
        });

        const savedRestaurant = await restaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if(!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        if (restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        res.json(updatedRestaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({message: 'Restaurant not found'});
        }

        if (restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Acess denied' });
        }

        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ message: 'Restaurant deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
};