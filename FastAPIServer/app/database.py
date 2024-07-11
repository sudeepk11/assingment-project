from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

mongodb_url = os.getenv("MONGODB_URL")
database_name = os.getenv("DATABASE_NAME")

if not mongodb_url or not database_name:
    raise ValueError("MONGODB_URL and DATABASE_NAME must be set in the .env file")

client = AsyncIOMotorClient(mongodb_url)
db = client[database_name]

def get_user_collection():
    return db["users"]
