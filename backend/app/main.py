from dotenv import load_dotenv
import os
from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base, Session

load_dotenv()

# Replace with your Supabase connection string
DATABASE_URL = os.getenv("DATABASE_URL")
# # SQLAlchemy setup
# engine = create_engine(DATABASE_URL, echo=True)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()

# # Example model
# class User(Base):
#     __tablename__ = "users"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, unique=True, index=True)

# # Create tables (for demo only; in production use Alembic migrations)
# Base.metadata.create_all(bind=engine)

# # FastAPI app
# app = FastAPI()

# # Dependency to get DB session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @app.get("/")
# def read_root():
#     return {"message": "FastAPI + Supabase Postgres is working!"}

# @app.post("/users/")
# def create_user(name: str, db: Session = Depends(get_db)):
#     user = User(name=name)
#     db.add(user)
#     db.commit()
#     db.refresh(user)
#     return user

# @app.get("/users/")
# def list_users(db: Session = Depends(get_db)):
#     return db.query(User).all()


app = FastAPI()
@app.get("/")
def root():
    return DATABASE_URL