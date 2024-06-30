npx create-next-app@latest patient --typescript --tailwind --eslint
npx create-next-app@latest provider --typescript --tailwind --eslint
npx create-next-app@latest admin --typescript --tailwind --eslint

npm run start:all

docker-compose up --build
docker-compose -f docker-compose.yml up
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

docker-compose down
