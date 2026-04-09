# app/services/intent_detector.py

import re
from typing import Dict


class IntentDetector:
    """
    Rule-based intent detector (v1)
    Free, fast, deterministic
    """

    INTENT_RULES = {
        "BUILD": [
            r"\b(build|create|develop|make)\b",
            r"\bwebsite|app|backend|frontend|api\b",
        ],
        "EDIT": [
            r"\b(edit|modify|change|update|improve)\b",
        ],
        "FIX": [
            r"\b(fix|bug|error|issue|crash|debug)\b",
        ],
        "EXPLAIN": [
            r"\b(explain|how does|what is|why)\b",
        ],
        "TEST": [
            r"\b(test|validate|check|verify)\b",
        ],
        "CHAT": [
            r"\b(hi|hello|hey|thanks|okay|cool)\b",
        ],
    }

    def detect_intent(self, text: str) -> Dict[str, str]:
        if not text or not text.strip():
            return {"intent": "UNKNOWN", "confidence": "0.0"}

        text = text.lower()

        for intent, patterns in self.INTENT_RULES.items():
            for pattern in patterns:
                if re.search(pattern, text):
                    return {"intent": intent, "confidence": "0.90"}

        return {"intent": "UNKNOWN", "confidence": "0.50"}
