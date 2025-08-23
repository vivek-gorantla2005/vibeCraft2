# Use Ubuntu as the base image
FROM ubuntu:22.04

# Avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update -y && \
    apt-get install -y curl git sudo bash && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js 20 + npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Set working directory
WORKDIR /home/user

# Clone boilerplate repo (optional – if you want a starter project always baked in)
RUN git clone https://github.com/vivek-gorantla2005/react-ts-setup my-app

WORKDIR /home/user/my-app

RUN npm install

# Copy startup script
COPY script.sh /script.sh
RUN chmod +x /script.sh

# Install code-server (VS Code in browser)
RUN curl -fsSL https://code-server.dev/install.sh | sh


# Expose Vite dev server port
EXPOSE 49999
EXPOSE 8080

# Default command
CMD ["/script.sh"]
