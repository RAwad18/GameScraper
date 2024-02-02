FROM node:18.19.0-alpine3.19

WORKDIR /app

COPY src/package*.json ./

RUN npm install

COPY ./src .

EXPOSE 8080

CMD [ "node", "index.js" ]