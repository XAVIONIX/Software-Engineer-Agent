from app.executor.executor import Executor

executor = Executor()

plan = [
    "Design UI/UX",
    "Develop frontend"
]

results = executor.execute(plan)

print("\nFRONTEND AGENT RESULTS:\n")
for r in results:
    print(r)
