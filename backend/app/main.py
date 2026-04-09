# app/main.py
from dotenv import load_dotenv

from app.api.v1 import build, chat, check, command, generate, session
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import stream

app = FastAPI(
    title="AI Software Engineer V2",
    version="0.1",
    description="Backend API for AI Software Engineer V2"
)

# CORS setup (for frontend integration later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(build.router, prefix="/build", tags=["Build"])
app.include_router(check.router, prefix="/check", tags=["Check"])
app.include_router(command.router, prefix="/command", tags=["Command"])
app.include_router(session.router, prefix="/session", tags=["Session"])
app.include_router(stream.router, prefix="/stream", tags=["Stream"])
app.include_router(generate.router, prefix="/generate", tags=["Generate"])

# Health check
@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}
