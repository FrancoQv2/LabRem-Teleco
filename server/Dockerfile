FROM node:18.7.0

WORKDIR /usr/src/server

COPY ./package.json .
RUN npm install
COPY . .

RUN apt update \
    && apt install inetutils-ping

EXPOSE 3000

CMD npm start
