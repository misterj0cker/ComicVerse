# ComicVerse 📚🎨

A web application where users can register, browse, filter, and rent comics, books, and mangas.

## 🏗️ Architecture Overview

ComicVerse follows a **Layered Architecture Pattern** with clear separation of concerns:

```
┌─────────────────────────────────────┐
│      Frontend Layer (React)          │
│    - Components, Pages, Services     │
└─────────────────────────────────────┘
                  ↕ REST API
┌─────────────────────────────────────┐
│     Backend Layer (Node.js)          │
│  - Controllers, Routes, Middleware   │
└─────────────────────────────────────┘
                  ↕
┌─────────────────────────────────────┐
│    Database Layer (MySQL)            │
│      - Tables & Relations            │
└─────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React
- **UI Library**: Bootstrap
- **IDE**: Visual Studio Code

### Backend
- **Runtime**: Node.js
- **API Architecture**: REST APIs
- **Server**: Express.js

### Database
- **Database**: MySQL

## 📁 Project Structure

```
ComicVerse/
├── frontend/                    # React Application
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── pages/               # Page components (Home, Browse, Dashboard, etc.)
│   │   ├── services/            # API service calls
│   │   ├── styles/              # Bootstrap customizations & CSS
│   │   ├── App.jsx              # Main App component
│   │   └── index.js             # Entry point
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── backend/                     # Node.js Server
│   ├── src/
│   │   ├── controllers/         # Request handlers for business logic
│   │   ├── models/              # Database models
│   │   ├── routes/              # API route definitions
│   │   ├── middleware/          # Authentication, validation, error handling
│   │   ├── config/              # Database configuration
│   │   ├── utils/               # Helper functions
│   │   └── server.js            # Express server entry point
│   ├── package.json
│   └── README.md
│
├── database/                    # Database Schema
│   ├── schema.sql               # MySQL table definitions
│   └── seed.sql                 # Initial data (optional)
│
├── docs/                        # Documentation
│   ├── ADR/                     # Architecture Decision Records
│   ├── API.md                   # API Documentation
│   └── SETUP.md                 # Setup Instructions
│
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server running locally
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/misterj0cker/ComicVerse.git
   cd ComicVerse
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Setup Database**
   - Create MySQL database: `comicverse_db`
   - Run: `mysql -u root -p comicverse_db < ../database/schema.sql`

## 📋 Features

- ✅ User Registration & Authentication
- ✅ Browse Comics, Books & Mangas
- ✅ Advanced Filtering System
- ✅ Rental Management
- ✅ User Dashboard
- ✅ Responsive Design (Bootstrap)

## 🏛️ Architecture Decisions

All architectural decisions are documented in the `/docs/ADR/` folder:

- **ADR001**: React as Frontend Framework
- **ADR002**: MySQL Database
- **ADR003**: Layered Architecture Pattern
- **ADR004**: Node.js Backend
- **ADR005**: Visual Studio Code IDE
- **ADR007**: REST API Architecture
- **ADR008**: Bootstrap UI Framework

## 📝 API Documentation

See `/docs/API.md` for complete REST API documentation.

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Happy coding! 🎉**
