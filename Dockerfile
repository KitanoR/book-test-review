# Base image
FROM ubuntu:latest

# Set working directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    python3 \
    python3-pip \
    python3-venv \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 18.18.0 and Yarn
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn && \
    node -v && yarn -v

# Install FastAPI dependencies
COPY bookApi/requirements.txt /app/bookApi/
RUN python3 -m venv /app/venv && \
    /app/backend/venv/bin/pip install --upgrade pip && \
    /app/backend/venv/bin/pip install -r /app/bookApi/requirements.txt

# Install Next.js dependencies with Yarn
COPY book-web/package.json book-web/yarn.lock /app/book-web/
RUN cd /app/book-web && yarn install && yarn build

# Copy source code
COPY backend /app/bookApi
COPY frontend /app/book-web

# Expose ports (8000 for FastAPI, 3000 for Next.js)
EXPOSE 8000 3000

# Start both FastAPI and Next.js using Yarn
CMD ["bash", "-c", "source /app/backend/venv/bin/activate && uvicorn bookApi:app --host 0.0.0.0 --port 8000 & cd /app/book-web && yarn start"]
