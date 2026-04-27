#!/bin/bash

echo "Starting deployment..."

git pull origin main

echo "Installing dependencies..."
npm install

echo "Running migrations..."
npm run db:migrate

echo "Restarting application..."
pkill -f "node src/server.js" || true
nohup npm start > app.log 2>&1 &

echo "Deployment completed."