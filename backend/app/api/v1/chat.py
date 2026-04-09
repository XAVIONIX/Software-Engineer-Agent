# app/api/v1/chat.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
def chat_test():
    return {"message": "Chat API working"}
