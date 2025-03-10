#!/bin/sh

# (NOT defined in docker-compose.yml because it will NOT run in the entire service of the app)
# The files are downloaded concurrently, so only after a while they start appearing in the pretended folder
echo -e "\033[34mRespectfully scrapping data from IST's website\033[0m"
cd crawler/
sudo docker build -f Dockerfile.crawler -t crawler_img .
sudo docker run -d --rm --network host -v $(pwd)/../data/data-llm:/app/00_downloads/full/ --name crawler crawler_img
cd ..

# exit 1

echo -e "\033[34mBuilding the backend and frontend containers\033[0m"

# Uses Docker Bake + BuildKit allows for more efficient builds 
# (building in parallel, advanced caching, layer caching, ...)
COMPOSE_BAKE=true sudo docker-compose up --build -d

# Ensure the services start properly
sleep 5 # quick nap

# (even with more instances, the container with index 1 is enough to update the shared database)
echo -e "\033[34mPopulating the vector DB with the content from the downloaded PDFs\033[0m"
sudo docker exec istoresumido-backend-1 python3 -m RAGeneration.populate_database

# Testing the accuracy of the LLM
# echo -e "\033[34mTesting the accuracy of the prompts\033[0m"
# sudo docker exec istoresumido-backend-1 /app/RAGeneration/test_rag.py