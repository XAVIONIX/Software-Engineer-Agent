# app/api/v1/build.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
def build_test():
    return {"message": "Build API working"}
