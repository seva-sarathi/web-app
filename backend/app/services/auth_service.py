from datetime import datetime, timedelta
import bcrypt
from jose import jwt
from app.core.config import settings

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # 1. Convert both the plain text and hash into bytes (computer format)
    password_bytes = plain_password.encode('utf-8')
    hash_bytes = hashed_password.encode('utf-8')
    
    # 2. Let bcrypt check if they match
    return bcrypt.checkpw(password_bytes, hash_bytes)

def get_password_hash(password: str) -> str:
    # 1. Convert the password to bytes
    password_bytes = password.encode('utf-8')
    
    # 2. Generate a random 'salt' (extra random characters to make it unguessable)
    salt = bcrypt.gensalt()
    
    # 3. Hash the password and convert it back to a standard string
    hashed_password_bytes = bcrypt.hashpw(password_bytes, salt)
    return hashed_password_bytes.decode('utf-8')

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt