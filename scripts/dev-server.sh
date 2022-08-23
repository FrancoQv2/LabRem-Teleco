#!/bin/bash

# sudo chmod 777 scripts/dev-server.sh
# ./scripts/dev-server.sh

IMAGE_NAME=dev-server
CONTAINER_NAME=dev-server
NETWORK_NAME=teleco_local

# docker rm -f $CONTAINER_NAME
# docker rmi $IMAGE_NAME

docker build -f server/Dockerfile.dev -t $IMAGE_NAME server

docker run -ti --name $CONTAINER_NAME -v $(pwd)/server:/usr/src/server -p 3005:3005 --network $NETWORK_NAME $IMAGE_NAME
