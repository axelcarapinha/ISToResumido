import argparse
import os

from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM
from .get_embedding_function import get_embedding_function

#TODO uncomment if NOT running locally
# Loading the API key for the prompt
load_dotenv()
DEBUG = os.getenv("DEBUG")
# LLM_API_KEY = os.getenv("OPENAI_API_KEY")
# if not LLM_API_KEY:
#     raise ValueError("OPENAI_API_KEY is not set in the .env file.")

CHROMA_PATH = "chroma"
PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}
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

    model = OllamaLLM(model="tinyllama") #TODO use a yaml file for this configuration
    response_text = model.invoke(prompt)

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)
    return response_text


if __name__ == "__main__":
    perform_query()