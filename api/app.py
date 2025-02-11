from flask import Flask, request, jsonify
from RAGeneration.query_data import perform_query
from RAGeneration.query_data import query_rag


app = Flask(__name__)

@app.route("/query", methods=["POST"])
def handle_query():
    """Handles query_data requests"""
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"error": "Missing question"}), 400

    raw_response = query_rag(question)
    return jsonify({"response": raw_response})

if __name__ == "__main__":
    app.run(debug=True)