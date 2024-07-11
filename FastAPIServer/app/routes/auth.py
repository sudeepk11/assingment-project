from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from app.models.user import UserBase,UserCreate,UserLogin
from app.database import get_user_collection
from passlib.context import CryptContext
from app.auth import create_access_token
from datetime import timedelta

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
async def register(user: UserCreate, user_collection=Depends(get_user_collection)):
    user_exists = await user_collection.find_one({"email": user.email})
    if user_exists:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = pwd_context.hash(user.password)
    user_dict = user.dict()
    user_dict['password'] = hashed_password
    await user_collection.insert_one(user_dict)
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user_dict["email"]}, expires_delta=access_token_expires
    )
    user_base = UserBase(email=user_dict["email"], username=user_dict["username"])
    return {"access_token": access_token, "token_type": "bearer","user":jsonable_encoder(user_base)}

@router.post("/login")
async def login(user: UserLogin, user_collection=Depends(get_user_collection)):
    user_record = await user_collection.find_one({"email": user.email})
    if not user_record:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    if not pwd_context.verify(user.password, user_record['password']):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user_record["email"]}, expires_delta=access_token_expires
    )
    user_base = UserBase(email=user_record["email"], username=user_record["username"])
    return {"access_token": access_token, "token_type": "bearer","user": jsonable_encoder(user_base)}
