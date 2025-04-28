#!/bin/bash

# Kill any existing processes on ports 3000 and 3001
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

# Start the backend server
cd backend
npm run start:dev &

# Start the frontend server
cd ../frontend
npm run dev 