FROM node:latest

ENV PORT=4000

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

RUN npm install -g nodemon

COPY . .

CMD [ "nodemon", "app.js" ]