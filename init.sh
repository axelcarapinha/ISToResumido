#!/bin/sh

### 1) Initial setup ###

# Scrapes the needed PDF data 
# (NOT defined in the docker compose because it will NOT run in the entire service of the app)
cd crawler/
sudo docker build -f Dockerfile.crawler -t crawler_img .
sudo docker run --rm --network host -v $(pwd)/../data-llm:/app/00_downloads/full/ --name crawler crawler_img
cd ..

# Calculates the embeddings for the PDF chunks
# and store them in the Vector DB
#TODO


### 2) Running the service! ###
# Runs the model serving the client prompts
#TODO ollama serve &

# Prepares the service itself
# sudo docker-compose up --build