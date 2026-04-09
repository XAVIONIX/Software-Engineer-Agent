# app/services/orchestrator.py

from typing import Dict
from app.services.intent_detector import IntentDetector
from app.memory.state_manager import StateManager


class Orchestrator:
    """
    Core brain of AI Software Engineer v2
    Routes user input based on intent & mode
    """

    def __init__(self):
        self.intent_detector = IntentDetector()
        self.state_manager = StateManager()

    def handle_request(
        self,
        session_id: str,
        user_input: str,
        mode: str = "MODE_2",  # MODE_1 or MODE_2
    ) -> Dict:
        """
        Entry point for all user interactions
        """

        # 1️⃣ Detect intent
        intent_result = self.intent_detector.detect_intent(user_input)
        intent = intent_result["intent"]

        # 2️⃣ Save conversation in hot memory
        self.state_manager.save_hot_state(
            session_id,
            {
                "last_input": user_input,
                "intent": intent,
                "mode": mode,
            },
        )

        # 3️⃣ Route based on mode
        if mode == "MODE_1":
            return self._handle_mode_one(session_id, intent, user_input)

        return self._handle_mode_two(session_id, intent, user_input)

    # ---------------- MODE HANDLERS ---------------- #

    def _handle_mode_one(self, session_id: str, intent: str, user_input: str) -> Dict:
        """
        Structured build mode
        """
        if intent == "BUILD":
            return {
                "intent": intent,
                "action": "COLLECT_REQUIREMENTS",
                "message": "Let's finalize requirements before building.",
            }

        return {
            "intent": intent,
            "action": "CHAT",
            "message": "We are in planning mode. Please describe your requirements.",
        }

    def _handle_mode_two(self, session_id: str, intent: str, user_input: str) -> Dict:
        """
        Conversational build mode (Lovable-style)
        """
        if intent == "BUILD":
            return {
                "action": "START_BUILD",
                "message": "Starting to build your project step by step.",
            }

        if intent == "EDIT":
            return {
                "action": "EDIT_CODE",
                "message": "Okay, let’s modify the existing implementation.",
            }

        if intent == "FIX":
            return {
                "action": "FIX_ISSUE",
                "message": "Debugging and fixing the issue.",
            }

        if intent == "EXPLAIN":
            return {
                "action": "EXPLAIN_CODE",
                "message": "Here’s an explanation for that.",
            }

        return {
            "action": "CHAT",
            "message": "Got it. Tell me what you’d like to do next.",
        }
