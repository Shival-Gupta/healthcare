# Development Stage
FROM node:18-alpine AS development
WORKDIR /patient
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4001
CMD ["npm", "run", "dev"]

# Builder Stage
FROM node:18-alpine AS builder
WORKDIR /patient
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine AS production
WORKDIR /patient
COPY --from=builder /patient/package*.json ./
COPY --from=builder /patient/next.config.mjs ./
COPY --from=builder /patient/public ./public
COPY --from=builder /patient/.next/standalone ./
COPY --from=builder /patient/.next/static ./.next/static
COPY --from=builder /patient/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 5001
CMD ["npm", "run", "start"]
