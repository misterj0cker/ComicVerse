# ComicVerse REST API Documentation

Base URL: `http://localhost:5000/api`

## 📌 Table of Contents

1. [Authentication](#authentication)
2. [Users](#users)
3. [Books](#books)
4. [Rentals](#rentals)

---

## Authentication

### Register User

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response** (201 Created):
```json
{
  "message": "User registered successfully"
}
```

**Error** (400):
```json
{
  "message": "Email already registered"
}
```

---

### Login User

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response** (200 OK):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error** (401):
```json
{
  "message": "Invalid email or password"
}
```

---

### Logout User

**Endpoint**: `POST /auth/logout`

**Headers**: 
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "message": "Logged out successfully"
}
```

---

## Users

### Get User Profile

**Endpoint**: `GET /users/:id`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "created_at": "2026-05-15T10:30:00Z"
}
```

---

### Update User Profile

**Endpoint**: `PUT /users/:id`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "username": "john_doe_updated",
  "email": "newemail@example.com"
}
```

**Response** (200 OK):
```json
{
  "message": "User profile updated successfully"
}
```

---

### Get All Users (Admin)

**Endpoint**: `GET /users`

**Headers**:
```
Authorization: Bearer <admin_token>
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "created_at": "2026-05-15T10:30:00Z"
  },
  {
    "id": 2,
    "username": "jane_smith",
    "email": "jane@example.com",
    "created_at": "2026-05-15T11:00:00Z"
  }
]
```

---

## Books

### Get All Books (with Filters)

**Endpoint**: `GET /books`

**Query Parameters**:
- `type` (optional): `comic`, `book`, or `manga`
- `search` (optional): Search term for title or author
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example**: 
```
GET /books?type=manga&search=One%20Piece&page=1&limit=10
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": 1,
      "title": "One Piece Vol. 1",
      "author": "Eiichiro Oda",
      "description": "Adventure of pirates searching for treasure",
      "type": "manga",
      "price": 9.99,
      "stock": 5,
      "image_url": "https://example.com/image.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

---

### Get Specific Book

**Endpoint**: `GET /books/:id`

**Response** (200 OK):
```json
{
  "id": 1,
  "title": "One Piece Vol. 1",
  "author": "Eiichiro Oda",
  "description": "Adventure of pirates searching for treasure",
  "type": "manga",
  "price": 9.99,
  "stock": 5,
  "image_url": "https://example.com/image.jpg"
}
```

**Error** (404):
```json
{
  "message": "Book not found"
}
```

---

### Create Book (Admin)

**Endpoint**: `POST /books`

**Headers**:
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "New Comic Title",
  "author": "Author Name",
  "description": "Book description",
  "type": "comic",
  "price": 5.99,
  "stock": 10,
  "image_url": "https://example.com/image.jpg"
}
```

**Response** (201 Created):
```json
{
  "message": "Book created successfully"
}
```

---

### Update Book (Admin)

**Endpoint**: `PUT /books/:id`

**Headers**:
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "Updated Title",
  "price": 6.99,
  "stock": 15
}
```

**Response** (200 OK):
```json
{
  "message": "Book updated successfully"
}
```

---

### Delete Book (Admin)

**Endpoint**: `DELETE /books/:id`

**Headers**:
```
Authorization: Bearer <admin_token>
```

**Response** (200 OK):
```json
{
  "message": "Book deleted successfully"
}
```

---

## Rentals

### Rent a Book

**Endpoint**: `POST /rentals`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "bookId": 1,
  "rentalDays": 14
}
```

**Response** (201 Created):
```json
{
  "message": "Book rented successfully",
  "rentalDate": "2026-05-20T10:30:00Z",
  "returnDate": "2026-06-03T10:30:00Z"
}
```

**Error** (400):
```json
{
  "message": "Book out of stock"
}
```

---

### Get User's Rentals

**Endpoint**: `GET /rentals/user/:userId`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "user_id": 1,
    "book_id": 1,
    "title": "One Piece Vol. 1",
    "author": "Eiichiro Oda",
    "rental_date": "2026-05-20T10:30:00Z",
    "return_date": "2026-06-03T10:30:00Z",
    "status": "active"
  }
]
```

---

### Return a Book

**Endpoint**: `PUT /rentals/:id/return`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "message": "Book returned successfully"
}
```

---

### Get All Rentals (Admin)

**Endpoint**: `GET /rentals`

**Headers**:
```
Authorization: Bearer <admin_token>
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "user_id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "book_id": 1,
    "title": "One Piece Vol. 1",
    "author": "Eiichiro Oda",
    "rental_date": "2026-05-20T10:30:00Z",
    "return_date": "2026-06-03T10:30:00Z",
    "status": "active"
  }
]
```

---

## Error Handling

### Common Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Missing or invalid parameters |
| 401 | Unauthorized | Invalid or missing authentication token |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

### Example Error Response

```json
{
  "message": "Invalid or expired token"
}
```

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are obtained from the `/auth/login` endpoint and are valid for 7 days by default.

---

## Rate Limiting

Currently no rate limiting implemented. This should be added for production.

---

## CORS Configuration

CORS is enabled for `http://localhost:3000` in development.

---

## Testing Endpoints

You can test the API using:

- **Postman** - API testing tool
- **cURL** - Command-line tool
- **Insomnia** - Another API client

### Example cURL Commands

**Login**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Books**:
```bash
curl http://localhost:5000/api/books?type=manga
```

**Create Book** (with token):
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"Author","type":"book","price":9.99}'
```

---

*API Documentation v1.0*  
*Last Updated: 2026-05-05*
