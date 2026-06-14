const pool = require('../config/database');

// Rent a book
exports.rentBook = async (req, res) => {
  try {
    const { bookId, rentalDays } = req.body;
    const userId = req.userId;

    if (!bookId || !rentalDays) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if book exists and has stock
    const [books] = await pool.query('SELECT * FROM books WHERE id = ?', [bookId]);
    if (books.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (books[0].stock <= 0) {
      return res.status(400).json({ message: 'Book out of stock' });
    }

    // Create rental record
    const rentalDate = new Date();
    const returnDate = new Date(rentalDate.getTime() + rentalDays * 24 * 60 * 60 * 1000);

    await pool.query(
      'INSERT INTO rentals (user_id, book_id, rental_date, return_date, status) VALUES (?, ?, ?, ?, ?)',
      [userId, bookId, rentalDate, returnDate, 'active']
    );

    // Decrease stock
    await pool.query('UPDATE books SET stock = stock - 1 WHERE id = ?', [bookId]);

    res.status(201).json({ 
      message: 'Book rented successfully',
      rentalDate,
      returnDate
    });
  } catch (error) {
    console.error('Rent book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's rentals
exports.getUserRentals = async (req, res) => {
  try {
    const userId = req.params.userId;

    const [rentals] = await pool.query(
      `SELECT r.*, b.title, b.author FROM rentals r 
       JOIN books b ON r.book_id = b.id 
       WHERE r.user_id = ? 
       ORDER BY r.rental_date DESC`,
      [userId]
    );

    res.json(rentals);
  } catch (error) {
    console.error('Get user rentals error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Return a rented book
exports.returnBook = async (req, res) => {
  try {
    const rentalId = req.params.id;

    const [rentals] = await pool.query('SELECT * FROM rentals WHERE id = ?', [rentalId]);
    if (rentals.length === 0) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    const rental = rentals[0];

    // Update rental status
    await pool.query('UPDATE rentals SET status = ? WHERE id = ?', ['returned', rentalId]);

    // Increase stock
    await pool.query('UPDATE books SET stock = stock + 1 WHERE id = ?', [rental.book_id]);

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Return book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all rentals (admin only)
exports.getAllRentals = async (req, res) => {
  try {
    const [rentals] = await pool.query(
      `SELECT r.*, u.username, u.email, b.title, b.author FROM rentals r
       JOIN users u ON r.user_id = u.id
       JOIN books b ON r.book_id = b.id
       ORDER BY r.rental_date DESC`
    );

    res.json(rentals);
  } catch (error) {
    console.error('Get all rentals error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
