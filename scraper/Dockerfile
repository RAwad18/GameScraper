FROM node:18.19.0-alpine3.19

WORKDIR /app

COPY src/package*.json ./

RUN npm install

COPY ./src .

CMD [ "node", "index.js" ]