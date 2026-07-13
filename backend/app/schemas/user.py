from pydantic import BaseModel, EmailStr

# For reading a user (Response)
class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_active: bool
    role: str

    class Config:
        from_attributes = True

# For creating a user (Request)
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# For JWT Token
class Token(BaseModel):
    access_token: str
    token_type: str