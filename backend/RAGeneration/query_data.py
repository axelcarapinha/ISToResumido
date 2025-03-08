import argparse
import os
import sys
import openai

from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM
from .get_embedding_function import get_embedding_function

# Loading the API key
LLM_API_KEY = None
api_key_path = '/run/secrets/openai_api_key' # using docker secrets
if os.path.exists(api_key_path):
    with open(api_key_path, 'r') as file:
        LLM_API_KEY = file.read().strip()

# Fallback to environment variable or .env if the secret isn't available
if LLM_API_KEY is None:
    # If Docker secret is not available, fall back to environment variable
    LLM_API_KEY = os.getenv("OPENAI_API_KEY")

if not LLM_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in the Docker secret or environment variable")

DEBUG = os.getenv("DEBUG")

# Prepare the context for the queries
CHROMA_PATH = "RAGeneration/chroma" # must be this way because the command to run from the module (outside the RAGeneration folder) is python3 -m RAGeneration.populate_database
PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: '{question}'
Finally, indicate the sources where you found the information (with a newline separating the response from the sources)
"""

# Creates a CLI option from the Python file
# (the API uses the query_rag() function directly)
def perform_query():
    # Create CLI.
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    query_rag(query_text)


def query_rag(query_text: str):
    # Prepare the DB.
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=5) #TODO perform a tunning for k (consider the performance)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    if DEBUG: 
        print(prompt)

    # Prompt with the context
    client = openai.Client(api_key=LLM_API_KEY)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",  
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )
    response_text = response.choices[0].message.content.strip()

    #TODO use a yaml file for this configuration
    # model = OllamaLLM(model="llama3") 
    # response_text = model.invoke(prompt)

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)
    return response_text


if __name__ == "__main__":
    perform_query()