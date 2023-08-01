echo "-> Removing container..."
docker compose -v -f docker-compose.dev.yml down
echo "-> Removing volume..."
docker volume rm teleco-db
echo "-> Removing image..."
docker rmi teleco-server
echo "-> Running..."
docker compose -f docker-compose.dev.yml up
