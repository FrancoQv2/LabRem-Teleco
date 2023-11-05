FROM node:18.18-slim
WORKDIR /usr/src/server
COPY package.json .
COPY package-lock.json .
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm","start"]
