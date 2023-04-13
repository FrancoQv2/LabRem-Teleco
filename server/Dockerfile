FROM node:18.7.0

# ---------------------------------
# Debe hacer referencia al puerto dentro del container
ENV SERVER_PORT=3000
ENV LOCALHOST_PORT=3033

ENV DB_HOST=teleco-db
ENV DB_DIALECT=mysql

ENV DB_USER=root
ENV DB_PASSWORD=123456

ENV DB_PORT=3306

ENV DB_NAME=LabRem_Teleco
# ---------------------------------

WORKDIR /usr/src/server

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
