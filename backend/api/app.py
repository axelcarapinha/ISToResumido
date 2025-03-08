import os
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

cors = CORS(app, resources={
    r"/": {
        "origins": [
            "http://istoresumido-frontend-1:3000",
            "http://localhost:3000",
            "https://istoresumido.axelamc.com"
        ],
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]  # for application/json
    }
})

# Rate Limiting (Cloudflare can avoid DDoS, but some help does not hurt XD)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=[app.config["DEFAULT_RATE_LIMIT"]]
)

@app.route("/", methods=["POST"])
@limiter.limit(app.config["REQUEST_LIMIT"])
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