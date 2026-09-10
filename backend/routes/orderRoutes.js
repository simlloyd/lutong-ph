const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getMyOrders,
    getOneOrder,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/orderController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const Restaurant = require('../models/Restaurant');

router.post('/', protect, restrictTo('customer'), placeOrder);
router.get('/my-orders', protect, restrictTo('customer'), getMyOrders);
router.get('/:id', protect, getOneOrder);
router.get('/', protect, restrictTo('admin', 'restaurant_owner'), getAllOrders);
router.put('/:id', protect, restrictTo('admin', 'restaurant_owner'), updateOrderStatus);

module.exports = router;