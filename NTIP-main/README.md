# Baby Care App

## Overview

Baby Care App is a full-stack web application designed to help parents track and manage their baby's daily activities such as feeding, sleeping, and symptoms. The application also includes activity scheduling (reminders and appointments), real-time weather information, and a statistics dashboard that visualizes daily, weekly, and monthly trends.

The system is built as a client-server application with authentication and protected routes.

---

## Features

### Baby Logs Management
- Create, read, update, and delete baby logs
- Track feeding, sleep, and symptoms
- Logs are linked to authenticated users

### Activities Management
- Add and delete activities (reminders & appointments)
- View scheduled activities
- (Edit functionality not yet implemented)

### Statistics Dashboard
- Daily overview of baby logs
- Weekly statistics visualization
- Monthly trend analysis
- Data grouped and calculated from database

### Weather Integration
- Real-time weather data using WeatherAPI
- Displays current weather for user location (Bihać)

### Authentication
- User registration and login system
- JWT-based authentication
- Token stored in localStorage
- Protected API routes using middleware

---

## Tech Stack

### Frontend
- React
- TailwindCSS
- Recharts (data visualization)
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js

### Database
- SQLite

### External APIs
- WeatherAPI (weather data)

### Authentication
- JSON Web Token (JWT)

---

## Architecture

The application follows a client-server architecture:

- **Frontend (React)** communicates with backend via REST API
- **Backend (Express)** handles business logic, authentication, and database operations
- **SQLite database** stores users, baby logs, and activities
- **Weather API** is called from frontend to fetch live weather data

---

## Project Structure

```bash
NTIP-main/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── styles.css
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   ├── tailwind.config.js
│   └── package.json
│
├── server/
│   ├── server.js
│   ├── config.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── db/
│
└── README.md
```

## Installation

### Backend
```bash
cd server
npm install
npm start
```

Server runs on:
```
http://localhost:3001
```

---

### Frontend
```bash
cd client
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

---

## Database

SQLite database includes:
- users
- baby_logs
- activities

Database initializes automatically on server start.

---

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/verify-token`

### Baby Logs
- `GET /api/baby-logs`
- `POST /api/baby-logs`
- `PUT /api/baby-logs/:id`
- `DELETE /api/baby-logs/:id`

### Activities
- `GET /api/activities`
- `POST /api/activities`
- `DELETE /api/activities/:id`

### Stats
- `GET /api/stats`

---

## Authentication Flow

- JWT token generated on login  
- Stored in `localStorage`  
- Sent via `Authorization: Bearer <token>`  
- Middleware protects routes  

---

## External Service

Weather data is fetched from **WeatherAPI** and displayed in dashboard.

---

## How It Works

- User registers or logs in  
- JWT token is generated  
- Token stored in localStorage  
- User interacts with app (logs, activities)  
- Backend verifies token  
- Data stored in SQLite  
- Stats generated from logs  
- Weather fetched live from API  

---

## Future Improvements

- Edit activities functionality  
- Week vs week analytics  
- Better responsive UI  
- Notification system  
- Advanced filtering  
- Deployment (Vercel / Render)  

---

## Author

Ena-Esma Toromanović  
Student project 2026 – NTIP (Napredne tehnike internet programiranja)