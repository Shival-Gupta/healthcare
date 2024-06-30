FROM node:18-alpine

WORKDIR /provider

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4002

CMD ["npm", "run", "dev"]