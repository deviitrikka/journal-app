# Journal App

A full-stack journaling application with emotion tracking and analytics.

## Project Structure

```
JournalApp/
├── backend/          # Express.js API server
├── frontend/         # React 19.2 frontend
└── README.md
```

## Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **MongoDB** (local installation or MongoDB Atlas account)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
# Copy .env.example to .env and configure:
# - MONGO_URI (your MongoDB connection string)
# - JWT_SECRET (a strong random string)
# - PORT (optional, defaults to 5000)

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Running Both Servers

### Option 1: Two Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using npm-run-all (if installed globally)

You can create a root-level script to run both, but it's easier to use two terminals.

## Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/journalapp
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

### Frontend (.env - optional)
```env
VITE_API_URL=http://localhost:5000/api
```

## MongoDB Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/journalapp`

### MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Replace `<password>` with your database password
5. Use format: `mongodb+srv://username:password@cluster.mongodb.net/journalapp`

## Features

- ✍️ Create and manage journal entries
- 😊 Automatic emotion detection
- 📊 Analytics dashboard with charts
- 🔐 Secure authentication
- 📱 Responsive design

## Troubleshooting

### Backend won't start
- Check if MongoDB is running (for local setup)
- Verify `.env` file exists and has correct values
- Check if port 5000 is available

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in backend
- Verify API URL in frontend `.env` (if using custom URL)

### MongoDB connection errors
- Verify MongoDB is running
- Check connection string in `.env`
- For Atlas: ensure IP is whitelisted and credentials are correct

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the dist/ folder with a static server
```

