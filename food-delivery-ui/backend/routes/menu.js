const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.post('/', menuController.createMenuItem);
router.get('/all', menuController.getAllMenuItems);
router.get('/:restaurantId', menuController.getMenuByRestaurant);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;
