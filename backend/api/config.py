import os

class Config:
    DEFAULT_RATE_LIMIT = "3 per minute"
    REQUEST_LIMIT = "3 per minute"

    DEBUG = os.getenv("DEBUG", "0") == "1"  