from fastapi import FastAPI
from app.core.database import engine, Base
from app.api import auth

# Create database tables (In production, use Alembic for migrations instead of this)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="My Auth API")

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}