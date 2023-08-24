FROM node:18.7.0

WORKDIR /usr/src/server

COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev

COPY . .

RUN apt update \
    && apt install inetutils-ping

EXPOSE 3000

CMD ["npm","start"]
