# Development Stage
FROM node:18-alpine AS development
WORKDIR /admin
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]

# Builder Stage
FROM node:18-alpine AS builder
WORKDIR /admin
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine AS production
WORKDIR /admin
COPY --from=builder /admin/package*.json ./
COPY --from=builder /admin/next.config.mjs ./
COPY --from=builder /admin/public ./public
COPY --from=builder /admin/.next/standalone ./
COPY --from=builder /admin/.next/static ./.next/static
COPY --from=builder /admin/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 5000
CMD ["npm", "run", "start"]
