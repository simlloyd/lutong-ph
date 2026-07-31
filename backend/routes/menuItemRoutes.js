const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    getMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/menuItemController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', getMenuItems);
router.post('/', protect, restrictTo('restaurant_owner', 'admin'), createMenuItem);
router.put('/:id', protect, restrictTo('restaurant_owner', 'admin'), updateMenuItem);
router.delete('/:id', protect, restrictTo('restaurant_owner', 'admin'), deleteMenuItem);

module.exports = router;