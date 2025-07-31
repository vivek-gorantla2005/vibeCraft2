#!/bin/bash

cd /home/user/my-app

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start Vite server
echo "Starting Vite development server..."
npx vite --host 0.0.0.0 --port 49999
