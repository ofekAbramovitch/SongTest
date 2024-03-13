# Use an official Node.js runtime as the base image
FROM node:18 as base

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for the application
EXPOSE 3030

# Development stage
FROM base as dev

CMD [ "npm", "run", "start:dev" ]

# Production stage
FROM base as prod

RUN npm run build

CMD [ "node", "dist/main.js" ]