from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.auth import verify_token
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

data_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Set up OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    return payload

@data_router.get("/quote")
async def get_quote(current_user: dict = Depends(get_current_user)):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a motivational quote generator. Generate a short, inspiring quote of maximum 7 words."},
                {"role": "user", "content": "Generate a motivational quote."}
            ],
            max_tokens=20,
            n=1,
            stop=None,
            temperature=0.7,
        )
        
        quote = response.choices[0].message.content.strip()
        words = quote.split()
        if len(words) > 7:
            quote = ' '.join(words[:7])
        
        return {"quote": quote}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))