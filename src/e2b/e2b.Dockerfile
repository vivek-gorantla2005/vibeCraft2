# Use Ubuntu as the base image
FROM ubuntu:22.04

# Set environment variables to avoid prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install required dependencies
RUN apt-get update -y && \
    apt-get install -y curl git sudo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js 20
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm

# Set working directory
WORKDIR /home/user

# Clone your React boilerplate into `my-app` directory
RUN git clone https://github.com/vivek-gorantla2005/react-ts-setup my-app

WORKDIR /home/user/my-app

RUN npm install

# Copy compile script into container
COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Optional: Set default working directory
WORKDIR /home/user/my-app



