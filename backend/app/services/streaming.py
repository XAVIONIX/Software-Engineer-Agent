# app/services/streaming.py
"""
Streaming response handler for real-time execution updates
"""

import json
from typing import AsyncGenerator, Dict, Any
import asyncio


class StreamingExecutor:
    """
    Handles streaming of agent execution with real-time updates
    """

    def __init__(self):
        self.execution_queue = asyncio.Queue()

    async def add_log(self, log_entry: Dict[str, Any]):
        """Add a log entry to the stream"""
        await self.execution_queue.put(log_entry)

    async def stream_execution(self) -> AsyncGenerator[str, None]:
        """
        Stream execution logs as they arrive
        Yields JSON-formatted log entries
        """
        try:
            while True:
                # Wait for next log with timeout
                try:
                    log_entry = await asyncio.wait_for(
                        self.execution_queue.get(),
                        timeout=30.0
                    )
                except asyncio.TimeoutError:
                    # Send keepalive message
                    yield f"data: {json.dumps({'type': 'keepalive'})}\n\n"
                    continue

                # Format as Server-Sent Event
                yield f"data: {json.dumps(log_entry)}\n\n"

                # Break if this is the final message
                if log_entry.get("type") == "complete":
                    break

        except GeneratorExit:
            pass
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"

    async def execute_with_streaming(
        self,
        session_id: str,
        command: str,
        intent: str,
        mode: str,
        executor
    ) -> Dict[str, Any]:
        """
        Execute command and stream results
        """
        try:
            # Log: Start
            await self.add_log({
                "type": "start",
                "session_id": session_id,
                "command": command,
                "intent": intent,
                "timestamp": str(asyncio.get_running_loop().time())
            })

            # Simulate execution steps (will be replaced with actual agent execution)
            steps = [
                {"type": "planning", "message": f"Planning: {command}"},
                {"type": "analysis", "message": f"Analyzing intent: {intent}"},
                {"type": "execution", "message": "Starting execution..."},
                {"type": "progress", "message": "50% complete"},
                {"type": "progress", "message": "75% complete"},
            ]

            for step in steps:
                await self.add_log({
                    **step,
                    "timestamp": str(asyncio.get_running_loop().time())
                })
                await asyncio.sleep(0.2)  # Simulate work

            # Log: Complete
            await self.add_log({
                "type": "complete",
                "status": "success",
                "message": "Execution complete",
                "timestamp": str(asyncio.get_running_loop().time())
            })

            return {
                "status": "success",
                "session_id": session_id,
                "command": command,
                "intent": intent,
                "message": "Command executed successfully"
            }

        except Exception as e:
            await self.add_log({
                "type": "error",
                "error": str(e),
                "timestamp": str(asyncio.get_running_loop().time())
            })

            return {
                "status": "error",
                "session_id": session_id,
                "error": str(e)
            }


# Global streaming executor instance
streaming_executor = StreamingExecutor()
