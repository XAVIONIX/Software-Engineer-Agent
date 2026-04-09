# app/api/v1/command.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Optional
from app.services.orchestrator import Orchestrator
from app.memory.state_manager import StateManager
import uuid

router = APIRouter()
orchestrator = Orchestrator()
state_manager = StateManager()


class CommandRequest(BaseModel):
    session_id: Optional[str] = None
    command: str
    mode: str = "MODE_2"  # MODE_1 or MODE_2


class CommandResponse(BaseModel):
    session_id: str
    command: str
    intent: str
    action: str
    message: str
    status: str


@router.post("/execute", response_model=CommandResponse)
def execute_command(request: CommandRequest) -> Dict:
    """
    Main endpoint to execute AI engineer commands
    """
    try:
        # Generate session_id if not provided
        session_id = request.session_id or str(uuid.uuid4())
        
        # Process command through orchestrator
        result = orchestrator.handle_request(
            session_id=session_id,
            user_input=request.command,
            mode=request.mode
        )
        
        # Get intent from result or fallback
        intent = result.get("intent")
        if not intent:
            # If intent is not in result, extract it from orchestrator
            intent_result = orchestrator.intent_detector.detect_intent(request.command)
            intent = intent_result.get("intent", "UNKNOWN")
        
        return {
            "session_id": session_id,
            "command": request.command,
            "intent": intent,
            "action": result.get("action", "CHAT"),
            "message": result.get("message", "Command received"),
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/history/{session_id}")
def get_command_history(session_id: str):
    """
    Get command history for a session
    """
    try:
        history = state_manager.get_hot_state(session_id)
        return {
            "session_id": session_id,
            "history": history or []
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/session/{session_id}")
def clear_session(session_id: str):
    """
    Clear a session
    """
    try:
        state_manager.delete_hot_state(session_id)
        return {
            "session_id": session_id,
            "status": "cleared"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
