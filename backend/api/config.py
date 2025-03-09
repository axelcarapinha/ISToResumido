import os

class Config:
    DEFAULT_RATE_LIMIT = "3 per minute"
    REQUEST_LIMIT = "3 per minute"

    CORS_ALLOWED_URL = os.getenv("CORS_ALLOWED_URL", "http://localhost:3000")
    DEBUG = os.getenv("DEBUG", "0") == "1"

