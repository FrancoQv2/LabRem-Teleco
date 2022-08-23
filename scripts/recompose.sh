#!/bin/bash

# Pararse en .../teleco/
# sudo chmod 777 scripts/recompose.sh
# ./scripts/recompose.sh

# docker compose stop

docker compose down --volumes


# sudo rm -rf /home/francoq/labrem/volumenes/teleco-db/*

docker rmi teleco_server:latest teleco_client:latest

# docker rmi $(docker images -aq)

docker compose up
