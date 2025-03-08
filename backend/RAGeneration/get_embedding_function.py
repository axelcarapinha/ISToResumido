import os
from langchain_openai import OpenAIEmbeddings

LLM_API_KEY = None
api_key_path = '/run/secrets/openai_api_key'  # Using Docker secrets
if os.path.exists(api_key_path):
    with open(api_key_path, 'r') as file:
        LLM_API_KEY = file.read().strip()

# Fallback to environment variable or .env if the secret isn't available
if LLM_API_KEY is None:
    LLM_API_KEY = os.getenv("OPENAI_API_KEY")

if not LLM_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in the Docker secret or environment variable")

def get_embedding_function():
    return OpenAIEmbeddings(openai_api_key=LLM_API_KEY, model="text-embedding-3-small")