const express = require('express');
const router = express.Router();
const {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} = require('../controllers/restaurantController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', protect, restrictTo('restaurant_owner', 'admin'), createRestaurant);
router.put('/:id', protect, restrictTo('restaurant_owner', 'admin'), updateRestaurant);
router.delete('/:id', protect, restrictTo('restaurant_owner', 'admin'), deleteRestaurant);


module.exports = router;