from app.executor.executor import Executor

executor = Executor()

plan = [
    "Develop backend",
    "Integrate APIs"
]

results = executor.execute(plan)

print("\nBACKEND AGENT RESULTS:\n")
for r in results:
    print(r)
