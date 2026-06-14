const pool = require('../config/database');

// Get all books with filters
exports.getAllBooks = async (req, res) => {
  try {
    const { type, search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM books WHERE 1=1';
    const params = [];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    if (search) {
      query += ' AND (title LIKE ? OR author LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [books] = await pool.query(query, params);

    res.json({
      data: books,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: books.length
      }
    });
  } catch (error) {
    console.error('Get all books error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific book by ID
exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    const [books] = await pool.query('SELECT * FROM books WHERE id = ?', [bookId]);

    if (books.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(books[0]);
  } catch (error) {
    console.error('Get book by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, type, price, stock, image_url } = req.body;

    if (!title || !author || !type || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    await pool.query(
      'INSERT INTO books (title, author, description, type, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, author, description || null, type, price, stock || 0, image_url || null]
    );

    res.status(201).json({ message: 'Book created successfully' });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, description, type, price, stock, image_url } = req.body;

    await pool.query(
      'UPDATE books SET title = ?, author = ?, description = ?, type = ?, price = ?, stock = ?, image_url = ? WHERE id = ?',
      [title, author, description, type, price, stock, image_url, bookId]
    );

    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    await pool.query('DELETE FROM books WHERE id = ?', [bookId]);

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
