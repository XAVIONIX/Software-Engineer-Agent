# app/api/v1/stream.py
"""
Streaming API endpoints for real-time agent execution
"""

import asyncio

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import json

from app.services.streaming import StreamingExecutor
from app.services.orchestrator import Orchestrator

router = APIRouter()
orchestrator = Orchestrator()


class StreamCommandRequest(BaseModel):
    session_id: Optional[str] = None
    command: str
    mode: str = "MODE_2"


@router.post("/execute-stream")
async def execute_command_stream(request: StreamCommandRequest):
    """
    Execute command and stream results in real-time
    Uses Server-Sent Events (SSE) for streaming
    """
    try:
        # Process command through orchestrator
        result = orchestrator.handle_request(
            session_id=request.session_id or "temp",
            user_input=request.command,
            mode=request.mode
        )

        # Create a per-request executor to avoid cross-request event contamination
        executor = StreamingExecutor()

        # Kick off execution as a background task so streaming is truly concurrent
        asyncio.create_task(
            executor.execute_with_streaming(
                session_id=request.session_id or "temp",
                command=request.command,
                intent=result.get("intent", "UNKNOWN"),
                mode=request.mode,
                executor=None,
            )
        )

        # Return stream immediately — events arrive as execution progresses
        return StreamingResponse(
            executor.stream_execution(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/logs/{session_id}")
async def get_logs(session_id: str):
    """
    Get logs for a session (polling alternative to streaming)
    """
    try:
        # TODO: Implement log retrieval from storage
        return {
            "session_id": session_id,
            "logs": [],
            "status": "no_logs"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
