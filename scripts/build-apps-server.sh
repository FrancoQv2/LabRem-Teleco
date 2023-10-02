#!/bin/bash

##################################################################################################################
#
#       Descripcion: Script utilizado para generar la imagen Docker de las "Aplicaciones Web" (server)
#       Fecha Creacion: 26/08/2023
#       Fecha Modificacion: -
#       Version Script: 1.0
#
#################################################################################################################

if [ $# -lt 2 ]
then
    echo -e "Usage:"
    echo -e "\t ~/scripts/build-apps-server.sh <app_server> <version>"
    echo -e "Options:"
    echo -e "\t teleco | fisica | digital | control"
    echo -e "Example:"
    echo -e "\t ~/scripts/build-apps-server.sh teleco 1.0.0"
    exit 0
fi

# PATH_PROJECT="/home/labrem/apps/$1"
# PATH_IMAGES="/home/labrem/docker_images"
PATH_PROJECT="/home/francoq/labrem/$1"
PATH_IMAGES="/home/francoq/labrem/docker_images"

# Docker image to build
IMAGE_NAME=$(cat $PATH_PROJECT/docker-compose.production.yml | yq '.services.server.image' | cut -d ':' -f 1)
VERSION=$2

echo "-> Updating local repository"
cd $PATH_PROJECT
# git pull origin main
local_hash=$(git rev-parse HEAD)
remote_hash=$(git ls-remote origin main | cut -f 1)
if [ "$local_hash" != "$remote_hash" ]; then
    git pull origin main
else
    echo "Branch main already up to date!"
fi

echo "-> Building the docker image $IMAGE_NAME"
echo "-> Source Path: $PATH_PROJECT"
VERSION=$VERSION docker compose -f docker-compose.production.yml build server

# Se empaqueta la imagen en un archivo .tar
echo "-> Saving Docker image $IMAGE_NAME:$VERSION in $PATH_IMAGES"
docker save $IMAGE_NAME:$VERSION | gzip > $PATH_IMAGES/$IMAGE_NAME-$VERSION.tar.gz
# docker save -o $PATH_IMAGES/$IMAGE_NAME-$VERSION.tar $IMAGE_NAME:$VERSION

echo "-> DONE!"
cd $PATH_IMAGES
ls -lh | grep $IMAGE_NAME
