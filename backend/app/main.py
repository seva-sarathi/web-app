# main.py
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

# Import get_db from your database folder
from app.core.database import get_db

app = FastAPI()

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    # You now have access to the 'db' session here
    # Example: users = db.query(User).all()
    
    return {"message": "Database connection successful"}