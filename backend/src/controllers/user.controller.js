const pool = require('../config/database');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const [users] = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;

    if (!username && !email) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    let query = 'UPDATE users SET ';
    const params = [];

    if (username) {
      query += 'username = ?, ';
      params.push(username);
    }
    if (email) {
      query += 'email = ?, ';
      params.push(email);
    }

    query = query.slice(0, -2) + ' WHERE id = ?';
    params.push(userId);

    await pool.query(query, params);

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, username, email, created_at FROM users');
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
