#!/bin/bash
set -e

cd /home/user/my-app

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start Vite dev server
echo "Starting Vite development server on 0.0.0.0:49999 ..."
exec npx vite --host 0.0.0.0 --port 49999
