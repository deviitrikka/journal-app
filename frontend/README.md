# Journal App - Frontend

A beautiful, modern React 19.2 frontend for the Journal App with emotion tracking and analytics.

## Features

- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 📊 **Analytics Dashboard** - Interactive charts using Recharts
- 🔐 **Authentication** - Secure login and registration
- ✍️ **Journal Entries** - Create and view journal entries with emotion detection
- 📈 **Emotion Trends** - Track your emotional journey over time
- 🎯 **Real-time Updates** - Instant feedback and smooth animations

## Tech Stack

- **React 19.2** - Latest React version
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful charting library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Modern icon library
- **date-fns** - Date formatting utilities

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional, defaults to `http://localhost:5000/api`):
```env
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── JournalEntry.jsx
│   │   ├── JournalForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/         # React context providers
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── Analytics.jsx
│   ├── services/       # API services
│   │   └── api.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Features Overview

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes

### Dashboard
- Create new journal entries
- View all journal entries
- Emotion detection from content
- Optional emotion tags

### Analytics
- Emotion distribution charts (Bar & Pie)
- Filter by time period (All, Week, Month)
- Statistics cards
- Detailed emotion breakdown table

## API Integration

The frontend communicates with the backend API at:
- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/journals` - Journal CRUD operations
- `/api/analytics/trends` - Emotion analytics

All authenticated requests include the JWT token in the `x-auth-token` header.

## Styling

The app uses Tailwind CSS with custom:
- Color palette (blue/indigo gradients)
- Animations (fade-in, slide-up, scale-in)
- Custom components (cards, buttons, inputs)
- Responsive design for all screen sizes

## Browser Support

Modern browsers that support ES6+ features.

