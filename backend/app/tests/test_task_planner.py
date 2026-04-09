from app.planner.task_planner import TaskPlanner

planner = TaskPlanner()

print("BUILD PLAN:")
print(planner.create_plan("START_BUILD", "build a website"))

print("\nEDIT PLAN:")
print(planner.create_plan("EDIT_CODE", "edit homepage UI"))

print("\nFIX PLAN:")
print(planner.create_plan("FIX_ISSUE", "login bug"))
