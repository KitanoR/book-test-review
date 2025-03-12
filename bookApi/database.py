from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

import os

# Load .env file
dotenv_path = os.path.abspath(".env.test")

ENV_FILE = dotenv_path if os.getenv("TEST_ENV") == "true" else ".env"
load_dotenv(ENV_FILE, override=True)

# Access environment variables
DB_URL = os.getenv("DATABASE_URL")
SQLALCHEMY_DATABASE_URL = DB_URL

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
