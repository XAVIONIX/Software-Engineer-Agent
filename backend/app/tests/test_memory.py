# app/tests/test_memory.py
from app.memory.state_manager import StateManager

sm = StateManager()

# Test Redis
sm.save_hot_state("test_session", {"message": "hello"})
print("Redis:", sm.get_hot_state("test_session"))

# Test Mongo
mongo_id = sm.save_cold_state("test_collection", {"name": "Harsh", "role": "Engineer"})
print("Mongo Inserted ID:", mongo_id)
print("Mongo Data:", sm.get_cold_state("test_collection", {"name": "Harsh"}))
