# Use Node.js image for frontend
FROM node:18.18.0

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY book-web/package.json book-web/yarn.lock ./
RUN yarn install

# Copy the rest of the application files
COPY book-web ./

# Build the Next.js app
# RUN yarn build

# Expose Next.js port
EXPOSE 3000

# Start Next.js in production mode
CMD ["yarn", "dev"]
