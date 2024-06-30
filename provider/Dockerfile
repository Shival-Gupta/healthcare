# Development Stage
FROM node:18-alpine AS development
WORKDIR /provider
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4002
CMD ["npm", "run", "dev"]

# Builder Stage
FROM node:18-alpine AS builder
WORKDIR /provider
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine AS production
WORKDIR /provider
COPY --from=builder /provider/package*.json ./
COPY --from=builder /provider/next.config.mjs ./
COPY --from=builder /provider/public ./public
COPY --from=builder /provider/.next/standalone ./
COPY --from=builder /provider/.next/static ./.next/static
COPY --from=builder /provider/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 5002
CMD ["npm", "run", "start"]
