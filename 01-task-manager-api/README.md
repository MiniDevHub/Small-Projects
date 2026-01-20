# Task Manager API

A RESTful API for managing tasks built with Node.js, Express, and MongoDB.

## Features

- CRUD operations for tasks
- Input validation
- Error handling
- MongoDB database

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone "https://github.com/MiniDevHub/Small-Projects.git"
cd Small-Projects/task-manager-api
```

2. Install dependencies

```bash
npm install
```

3. Create .env file

```bash
cp .env.example .env
```

4. Update .env with your configuration

5. Run the application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

Coming soon...

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

## License

ISC

---

## **Step 16: Test Your Setup**

### Start MongoDB (if using local)

```bash
# On Mac/Linux
mongod

# On Windows (if installed as service)
# It should start automatically

# Or using MongoDB Compass - just open the application
```

### Run the server

```bash
npm run dev
```

You should see:

```
Server is running on port 5000
Environment: development
MongoDB Connected: localhost
Database Name: taskmanager
```

### Test in browser or using curl

```bash
# Test root endpoint
curl http://localhost:5000/

# Test health endpoint
curl http://localhost:5000/health
```

---
