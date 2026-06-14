# ComicVerse Backend

Backend server for ComicVerse built with Node.js, Express, and MySQL.

## 🏗️ Architecture Layers

### Controller Layer
Handles HTTP requests and business logic:
- `auth.controller.js` - User authentication (register, login)
- `user.controller.js` - User profile management
- `book.controller.js` - Book/Comic/Manga management
- `rental.controller.js` - Rental operations

### Route Layer
Defines API endpoints:
- `/src/routes/` - Express route definitions

### Middleware Layer
Handles authentication and validation:
- `auth.middleware.js` - JWT token verification

### Database Layer
MySQL connection pool and queries:
- `config/database.js` - Database configuration

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials

3. **Start the server**
   ```bash
   npm run dev    # With nodemon (auto-reload)
   npm start      # Production mode
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users` - Get all users (admin)

### Books
- `GET /api/books` - Get all books with filters
- `GET /api/books/:id` - Get specific book
- `POST /api/books` - Create book (admin)
- `PUT /api/books/:id` - Update book (admin)
- `DELETE /api/books/:id` - Delete book (admin)

### Rentals
- `POST /api/rentals` - Rent a book
- `GET /api/rentals/user/:userId` - Get user's rentals
- `PUT /api/rentals/:id/return` - Return a book
- `GET /api/rentals` - Get all rentals (admin)

## 🗄️ Database Schema

See `../database/schema.sql` for the complete schema.

### Main Tables
- `users` - User accounts
- `books` - Comics, books, mangas catalog
- `rentals` - Rental records

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT authentication
- CORS protection
- Input validation
- SQL prepared statements (prevent SQL injection)

## 🚀 Deployment

1. Set `NODE_ENV=production` in `.env`
2. Configure production database
3. Deploy to hosting platform (Heroku, Railway, etc.)

## 📝 Development

```bash
# Run with auto-reload
npm run dev

# Lint code
npm run lint

# Run tests
npm test
```

---

For more information, see the main ComicVerse README.
