const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    User login
// @access  Public
router.post('/login', authController.login);

// @route   POST /api/auth/logout
// @desc    User logout
// @access  Private
router.post('/logout', authController.logout);

module.exports = router;
