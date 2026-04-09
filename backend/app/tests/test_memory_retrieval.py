from app.memory.state_manager import StateManager

sm = StateManager()

# Save cold memory
sm.save_cold_state(
    "users",
    {"name": "Harsh", "role": "AI Engineer"}
)

# Smart retrieval
result = sm.smart_get(
    session_key="session_user_harsh",
    collection="users",
    query={"name": "Harsh"}
)

print("SMART MEMORY RESULT:", result)
