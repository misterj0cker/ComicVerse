const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const rentalController = require('../controllers/rental.controller');

// @route   POST /api/rentals
// @desc    Rent a book
// @access  Private
router.post('/', authMiddleware, rentalController.rentBook);

// @route   GET /api/rentals/user/:userId
// @desc    Get user's rentals
// @access  Private
router.get('/user/:userId', authMiddleware, rentalController.getUserRentals);

// @route   PUT /api/rentals/:id/return
// @desc    Return a rented book
// @access  Private
router.put('/:id/return', authMiddleware, rentalController.returnBook);

// @route   GET /api/rentals
// @desc    Get all rentals (admin only)
// @access  Private
router.get('/', authMiddleware, rentalController.getAllRentals);

module.exports = router;
