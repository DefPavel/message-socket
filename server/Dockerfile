FROM node:18.16.0-alpine3.17

# Создать директорию app
WORKDIR /app
# Используется символ подстановки для копирования как package.json, так и package-lock.json
COPY package*.json ./

RUN npm install

RUN npm run build

COPY ./dist .

EXPOSE 3434

CMD [ "node", "dist/app.js" ]