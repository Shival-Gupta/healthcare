FROM node:18-alpine

WORKDIR /patient

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4001

CMD ["npm", "run", "dev"]