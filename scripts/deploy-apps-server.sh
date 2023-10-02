#!/bin/bash

##################################################################################################################
#
#       Descripcion: Script utilizado para levantar el contenedor Docker de las "Aplicaciones Web" - (server)
#       Fecha Creacion: 26/08/2023
#       Fecha Modificacion: -
#       Version Script: 1.0
#
#################################################################################################################

if [ $# -lt 2 ]
then
    echo -e "Usage:"
    echo -e "\t ~/scripts/deploy-apps-server.sh <app_server> <version>"
    echo -e "Options:"
    echo -e "\t teleco | fisica | digital | control"
    echo -e "Example:"
    echo -e "\t ~/scripts/deploy-apps-server.sh teleco 1.0.0"
    exit 0
fi

PATH_PROJECT="/home/labrem/apps/$1"
PATH_IMAGES="/home/labrem/docker_images"

# Docker image to deploy
IMAGE_NAME=$(cat $PATH_PROJECT/docker-compose.production.yml | yq '.services.server.image' | cut -d ':' -f 1)
VERSION=$2

cd $PATH_PROJECT
PORT=$(cat .env | grep SERVER_PORT | cut -d '=' -f 2)

if [ "$(docker images | grep $IMAGE_NAME | grep $VERSION)" ]
then
    echo "-> Uploading docker container"
    if [ "$(docker ps -a | grep $IMAGE_NAME)" ]
    then
        echo "Removing current container"
        docker compose -f docker-compose.production.yml down server
    fi
    # docker run --name $IMAGE_NAME -d -p $PORT:3000 -v /docker_config/gestion/backend/appsettings.js:/app/src/appsettings.js -v /home/labrem/certs/cert.pem:/app/src/fullchain.pem -v /home/labrem/certs/privkey.pem:/app/src/privkey.pem $name:$version
    VERSION=$VERSION docker compose -f docker-compose.production.yml up -d server
    echo "-> Aplication running on port $PORT"
else
    echo "-> There is not image with the indicated version"
fi
