#!/bin/sh
 
# (NOT defined in the docker compose because it will NOT run in the entire service of the app)
echo -e "\033[34mRespectfully scrapping data from IST's website\033[0m"
cd crawler/
sudo docker build -f Dockerfile.crawler -t crawler_img .
sudo docker run -d --rm --network host -v $(pwd)/../data/data-llm:/app/00_downloads/full/ --name crawler crawler_img
cd ..

# echo -e "\033[34mRunning the LLM with ollama\033[0m"
OLLAMA_HOST=localhost:1930 ollama serve &

echo -e "\033[34mBuilding the backend and frontend containers\033[0m"
sudo docker-compose up --build

# # (even with more instances, the container with index 1 is enough to update the shared database)
echo -e "\033[34mPopulating the vector DB with the content from the downloaded PDFs\033[0m"
sudo docker exec istoresumido-backend-1 python3 -m RAGeneration.populate_database

# # Testing the accuracy of the LLM
# echo -e "\033[34mTesting the accuracy of the prompts\033[0m"
# sudo docker exec backend /app/RAGeneration/test_rag.py