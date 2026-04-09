# app/api/v1/check.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
def check_test():
    return {"message": "Check API working"}
