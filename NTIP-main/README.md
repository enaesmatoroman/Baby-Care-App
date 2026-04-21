# 👶 Baby Care App

## Overview

Baby Care App is a full-stack web application designed to help parents track and manage their baby's daily activities such as feeding, sleeping, and symptoms. The application also includes activity scheduling (reminders and appointments), real-time weather information, and a statistics dashboard that visualizes daily, weekly, and monthly trends.

The system is built as a client-server application with authentication and protected routes.

---

## Features

### 👶 Baby Logs Management
- Create, read, update, and delete baby logs
- Track feeding, sleep, and symptoms
- Logs are linked to authenticated users

### 📅 Activities Management
- Add and delete activities (reminders & appointments)
- View scheduled activities
- (Edit functionality not yet implemented)

### 📊 Statistics Dashboard
- Daily overview of baby logs
- Weekly statistics visualization
- Monthly trend analysis
- Data grouped and calculated from database

### 🌤 Weather Integration
- Real-time weather data using WeatherAPI
- Displays current weather for user location (Bihać)

### 🔐 Authentication
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
NTIP-main/
├── client/                     # React frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── ...
│   │                 
│   ├── src/
│   │   
│   │   ├── App.js              # Root layout, auth state, Header/Footer
│   │   ├── index.js
│   │   ├── styles.css          # Tailwind imports, base styles, btn-primary, etc.
│   │   ├── components/
│   │   │   ├── body/Body.js    # Layout wrapper for main content
│   │   │   ├── footer/Footer.js
│   │   │   ├──  header/Header.js
│   │   │   ├──  stats/StatsWidget.js
│   │   │   ├──  weather/WeatherWidget.js
│   │   ├── pages/    
│   │   │   ├── dashboard/Dashboard.js     
│   │   │   ├── login/Login.js
│   │   │   ├── register/Register.js
│   │   │   ├── baby-logs/addBabyLog.js, BabyLog.js, BabyLogs.js, editBabyLog.js
│   │   │   ├── activities/Activities.js, addActivity.js
│   │   ├── routes/routesList.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/
│   ├── server.js               # Entry point, listens on 3001 
│   ├── config.js               # SECRET_KEY 
│   ├── uploads/                # Uploaded clothing images
│   ├── controllers/            # auth, activity, babyLog, stats
│   ├── middlewares/
│   │   ├── authMiddleware.js   # JWT verification
│   ├── models/                 # activity, babyLog, user
│   ├── routes/                 # auth, activity, baby-logs, stats
│   ├── db/
│   │   ├── database.js         # SQLite connection
│   │   └── schemes/ activityScheme.js, babyLogScheme.js, userScheme.js                             # Schema definitions
│
└── README.md

---

## Installation Guide

### 1. Backend Setup

```bash
cd server
npm install
npm start

Server runs on:
http://localhost:3001

2. Frontend Setup
cd client
npm install
npm start

Frontend runs on:
http://localhost:3000

Database

The application uses SQLite with the following tables:

users
baby_logs
activities

Database is automatically initialized on server startup using schema files.

API Overview
Auth Routes
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-token
Baby Logs
GET /api/baby-logs
POST /api/baby-logs
PUT /api/baby-logs/:id
DELETE /api/baby-logs/:id
Activities
GET /api/activities
POST /api/activities
DELETE /api/activities/:id
Stats
GET /api/stats
Authentication

Authentication is implemented using JWT:

Token is generated on login
Stored in localStorage on the client
Sent in request headers as:
Authorization: Bearer <token>
Protected routes are secured using authentication middleware

External Services
Weather API

The application uses WeatherAPI to fetch real-time weather data and display current conditions in the dashboard.

How the System Works
User registers or logs in
Backend generates JWT token
Token is stored in localStorage
User performs actions (baby logs, activities)
Frontend sends requests with JWT token
Backend verifies token using middleware
Data is stored/retrieved from SQLite database
Statistics are generated from baby logs data
Weather data is fetched from WeatherAPI and displayed on dashboard

Tutorial Section
➕ Adding New Features
Create new route in /routes
Add logic in /controllers
Connect to database if needed
Add frontend page/component
➕ Adding New API Routes
Define route in Express
Attach controller function
Protect with middleware if needed
➕ Extending the System
Add new database tables in schema files
Extend stats logic for new analytics
Add new UI widgets in dashboard
Future Improvements
Edit functionality for activities
Better analytics (comparisons week vs week)
Improved UI responsiveness
Notifications/reminders system
Advanced filtering for baby logs
Deployment (Vercel / Render)



Author
Ena-Esma Toromanović Student project 2026 – NTIP (Napredne tehnike internet programiranja).