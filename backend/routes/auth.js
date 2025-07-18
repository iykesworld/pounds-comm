const express = require('express');
const { body } = require('express-validator');
const { register, login, registerAdmin, toggleRole } = require('../controllers/authController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// User registration
router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], register);

// User login
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], login);

// Admin registration (admin only)
router.post('/admin/register', auth, admin, [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], registerAdmin);

// ✅ Toggle user role (admin only)
router.put('/toggle-role', auth, admin, [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('role').isIn(['user', 'admin']).withMessage('Role must be "user" or "admin"')
], toggleRole);

module.exports = router;
