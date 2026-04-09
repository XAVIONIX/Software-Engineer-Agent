from app.executor.executor import Executor
from app.planner.task_planner import TaskPlanner

planner = TaskPlanner()
executor = Executor()

plan = planner.create_plan("BUILD", "build a full stack website")
results = executor.execute(plan)

print("\nEXECUTION RESULTS:\n")
for r in results:
    print(r)
