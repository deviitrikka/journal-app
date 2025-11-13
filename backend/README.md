# Journal App - Backend

Express.js backend API for the Journal App with MongoDB.

## Prerequisites

- Node.js 18+ and npm
- MongoDB (local installation or MongoDB Atlas account)

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create a `.env` file:**
```bash
cp .env.example .env
```

3. **Configure your `.env` file:**
   - Set `MONGO_URI` to your MongoDB connection string
     - Local: `mongodb://localhost:27017/journalapp`
     - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/journalapp`
   - Set `JWT_SECRET` to a strong random string
   - Optionally set `PORT` (defaults to 5000)

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will run on `http://localhost:5000` (or your configured PORT).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Journals
- `POST /api/journals` - Create a journal entry (requires auth)
- `GET /api/journals` - Get all journal entries (requires auth)

### Analytics
- `GET /api/analytics/trends?filter=all|week|month` - Get emotion trends (requires auth)

## Authentication

All protected routes require a JWT token in the `x-auth-token` header.

