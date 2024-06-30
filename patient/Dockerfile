# Use official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /patient

# Install dependencies including Next.js
RUN npm install next react react-dom

# Copy package.json and package-lock.json (if available) to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 4001
EXPOSE 4001

# Command to run the application
CMD ["npm", "start"]
