const express = require('express');
const { body } = require('express-validator');
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts, getByCategory } = require('../controllers/productController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all products (must come before parameterized routes)
router.get('/', getAllProducts);

// Filter by category (must come before /:slug)
router.get('/categories/:category', getByCategory);

// Create product
router.post('/', auth, admin, upload, [
  body('name').notEmpty(),
  body('category').notEmpty(),
  body('price').isNumeric(),
  body('stock').isNumeric(),
  body('description').notEmpty()
], createProduct);

// Update product
router.put('/:id', auth, admin, upload, [
  body('name').optional().notEmpty(),
  body('category').optional().notEmpty(),
  body('price').optional().isNumeric(),
  body('stock').optional().isNumeric(),
  body('description').optional().notEmpty()
], updateProduct);

// Delete product
router.delete('/:id', auth, admin, deleteProduct);

// Get single product (must come last)
router.get('/:slug', getProduct);

module.exports = router; 