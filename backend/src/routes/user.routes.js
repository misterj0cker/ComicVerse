const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Private
router.get('/:id', authMiddleware, userController.getUserProfile);

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', authMiddleware, userController.updateUserProfile);

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private
router.get('/', authMiddleware, userController.getAllUsers);

module.exports = router;
