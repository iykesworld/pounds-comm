const express = require('express');
const { body } = require('express-validator');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Create order (auth optional)
router.post('/', [
  body('products').isArray({ min: 1 }),
  body('totalPrice').isNumeric(),
  body('address').notEmpty(),
  body('email').isEmail(),
  body('phone').notEmpty()
], createOrder);

// Get user orders
router.get('/', auth, getUserOrders);

// Get all orders (admin)
router.get('/all', auth, admin, getAllOrders);

// Update order status (admin)
router.put('/:id', auth, admin, [
  body('status').isIn(['pending', 'shipped', 'delivered'])
], updateOrderStatus);

module.exports = router; 