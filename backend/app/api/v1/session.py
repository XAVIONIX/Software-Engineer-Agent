# app/api/v1/session.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import uuid
from app.memory.state_manager import StateManager

router = APIRouter()
state_manager = StateManager()


class SessionRequest(BaseModel):
    user_id: Optional[str] = None
    metadata: Optional[dict] = None


class SessionResponse(BaseModel):
    session_id: str
    created_at: str
    status: str


@router.post("/create", response_model=SessionResponse)
def create_session(request: Optional[SessionRequest] = None):
    """
    Create a new session
    """
    session_id = str(uuid.uuid4())
    
    session_data = {
        "session_id": session_id,
        "user_id": request.user_id if request else None,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "metadata": request.metadata if request else {},
        "commands": [],
        "status": "active"
    }
    
    state_manager.save_hot_state(session_id, session_data)
    
    return {
        "session_id": session_id,
        "created_at": session_data["created_at"],
        "status": "active"
    }


@router.get("/{session_id}")
def get_session(session_id: str):
    """
    Get session details
    """
    session_data = state_manager.get_hot_state(session_id)
    
    if not session_data:
        return {
            "session_id": session_id,
            "status": "not_found"
        }
    
    return session_data


@router.put("/{session_id}")
def update_session(session_id: str, metadata: dict):
    """
    Update session metadata
    """
    session_data = state_manager.get_hot_state(session_id)
    
    if not session_data:
        return {
            "session_id": session_id,
            "status": "not_found"
        }
    
    session_data.update(metadata)
    state_manager.save_hot_state(session_id, session_data)
    
    return {
        "session_id": session_id,
        "status": "updated"
    }
