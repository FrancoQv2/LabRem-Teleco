#!/bin/bash

# Pararse en ../labrem/

# sudo chmod 777 teleco/scripts/create-db.sh
# ./teleco/scripts/create-db.sh

# Para entrar al container de la db
# docker exec -ti teleco-mysqldb bash

# Para entrar a mysql desde el container
# mysql -u root -p

FILENAME=LabRem_Teleco
CONTAINER_NAME=teleco-mysqldb

DB_USER=root
DB_PASSWORD=123456
DB_NAME=LabRem_Teleco

cat $(pwd)/teleco/database/$FILENAME.sql | docker exec -i $CONTAINER_NAME mysql -u $DB_USER --password=$DB_PASSWORD $DB_NAME
