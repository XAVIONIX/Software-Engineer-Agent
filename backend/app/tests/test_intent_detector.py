from app.services.intent_detector import IntentDetector

detector = IntentDetector()

tests = [
    "build a full stack website",
    "fix the login bug",
    "explain this function",
    "edit the homepage UI",
    "hello how are you",
]

for t in tests:
    print(t, "->", detector.detect_intent(t))
