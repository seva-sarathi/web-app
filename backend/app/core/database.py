from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

load_dotenv()

# Replace with your Supabase connection string
DATABASE_URL = os.getenv("DATABASE_URL")

engine_kwargs = {}
if DATABASE_URL.startswith("sqlite"):
    engine_kwargs["connect_args"] = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, **engine_kwargs)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Create a dependency that provides a database session to your routes
def get_db():
    db = SessionLocal()
    try:
        yield db  # Provides the session to the route
    finally:
        db.close() # Ensures the connection is closed after the response is sent
