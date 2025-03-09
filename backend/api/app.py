import os
import redis
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from RAGeneration.query_data import query_rag
from RAGeneration.populate_database import main
from .config import Config

app = Flask(__name__)

# Load the configurations from config.py
app.config.from_object(Config)

# CORS configuration using the environment variable for origins
CORS_ALLOWED_URL=app.config["CORS_ALLOWED_URL"].rstrip("/") # a slash at the end would CORSpond to a mistake
cors = CORS(app, resources={
    r"/*": {
        "origins": CORS_ALLOWED_URL,
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]  # for application/json
    }
})

# Rate limiting with Redis (if the service restarts, the usage count will continue, not restart)
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")  # default Redis URL

# Using storage_uri directly
limiter = Limiter(
    get_remote_address,
    app=app,
    storage_uri=REDIS_URL,
    default_limits=[app.config["DEFAULT_RATE_LIMIT"]]
)

@app.route("/", methods=["POST"])
@limiter.limit(app.config["REQUEST_LIMIT"])  # Apply rate limit to the route
def handle_query():
    print("Testing, to check if the query is received")
    """Handles query_data requests"""
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"error": "Missing question"}), 400

    raw_response = query_rag(question)
    return jsonify({"answer": raw_response})

if __name__ == "__main__":
    app.run(debug=app.config["DEBUG"])
