#!/bin/bash
set -e

cd /home/user/my-app

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Starting code-server on 0.0.0.0:8080 with /home/user/my-app ..."
nohup code-server /home/user/my-app --bind-addr 0.0.0.0:8080 --auth none >/dev/null 2>&1 &

echo "Starting Vite development server on 0.0.0.0:49999 ..."
exec npx vite --host 0.0.0.0 --port 49999
