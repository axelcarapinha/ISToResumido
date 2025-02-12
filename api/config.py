import os

class Config:
    # CORS settings
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "").split(",")
    
    DEFAULT_RATE_LIMIT = "3 per minute"
    REQUEST_LIMIT = "5 per minute"
    
    DEBUG = False
