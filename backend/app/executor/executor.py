from typing import List, Dict
from app.agents.backend_agent import BackendAgent
from app.agents.frontend_agent import FrontendAgent


class Executor:
    def __init__(self):
        self.backend_agent = BackendAgent()
        self.frontend_agent = FrontendAgent()

    def execute(self, plan: List[str]) -> List[Dict]:
        results = []

        backend_context = {"project_root": "generated_project/backend"}
        frontend_context = {"project_root": "generated_project/frontend"}

        for task in plan:
            task_lower = task.lower()

            if "backend" in task_lower or "api" in task_lower:
                result = self.backend_agent.execute(task, backend_context)
            elif "frontend" in task_lower or "ui" in task_lower:
                result = self.frontend_agent.execute(task, frontend_context)
            else:
                result = "⏭️ Skipped (no matching agent)"

            results.append({"task": task, "result": result})

        return results
