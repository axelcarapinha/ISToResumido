#!/bin/sh
 
# (NOT defined in the docker compose because it will NOT run in the entire service of the app)
echo "Respectfully scrapping data from IST's website"
cd crawler/
sudo docker build -f Dockerfile.crawler -t crawler_img .
sudo docker run -d --rm --network host -v $(pwd)/../data-llm:/app/00_downloads/full/ --name crawler crawler_img
cd ..

echo "Running the LLM with ollama"
ollama serve &

echo "Building the backend and frontend containers"
sudo docker-compose up --build

# (even with more instances, the container with index 1 is enough to update the shared database)
echo "Populating the vector DB with the content from the downloaded PDFs"
sudo docker exec istoresumido-backend-1 python3 -m RAGeneration.populate_database

# Testing the accuracy of the LLM
echo "Testing the accuracy of the prompts"
sudo docker exec backend /app/RAGeneration/test_rag.py