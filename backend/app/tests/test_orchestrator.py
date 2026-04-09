from app.services.orchestrator import Orchestrator

orch = Orchestrator()

session_id = "session_001"

tests = [
    ("build a website", "MODE_2"),
    ("edit the homepage", "MODE_2"),
    ("fix the login bug", "MODE_2"),
    ("explain the backend", "MODE_2"),
    ("hello", "MODE_2"),
]

for text, mode in tests:
    result = orch.handle_request(session_id, text, mode)
    print(text, "=>", result)
