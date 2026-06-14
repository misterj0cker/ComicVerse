const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const bookController = require('../controllers/book.controller');

// @route   GET /api/books
// @desc    Get all books with filters
// @access  Public
router.get('/', bookController.getAllBooks);

// @route   GET /api/books/:id
// @desc    Get a specific book by ID
// @access  Public
router.get('/:id', bookController.getBookById);

// @route   POST /api/books
// @desc    Create a new book (admin only)
// @access  Private
router.post('/', authMiddleware, bookController.createBook);

// @route   PUT /api/books/:id
// @desc    Update a book (admin only)
// @access  Private
router.put('/:id', authMiddleware, bookController.updateBook);

// @route   DELETE /api/books/:id
// @desc    Delete a book (admin only)
// @access  Private
router.delete('/:id', authMiddleware, bookController.deleteBook);

module.exports = router;
