import os
from typing import Dict, Any
from app.agents.base import BaseAgent


class BackendAgent(BaseAgent):
    name = "BackendAgent"

    def execute(self, task: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handles backend-related tasks.
        """
        project_root = context.get("project_root", "generated_project/backend")

        os.makedirs(project_root, exist_ok=True)

        if "Develop backend" in task:
            self._create_fastapi_structure(project_root)
            return {
                "status": "success",
                "message": "Backend structure created successfully",
                "path": project_root
            }

        if "Integrate APIs" in task:
            return {
                "status": "success",
                "message": "API integration placeholder executed"
            }

        return {
            "status": "ignored",
            "message": f"Task not handled by BackendAgent: {task}"
        }

    def _create_fastapi_structure(self, root: str):
        folders = [
            "app",
            "app/api",
            "app/api/v1",
            "app/core",
            "app/models",
            "app/services"
        ]

        for folder in folders:
            os.makedirs(os.path.join(root, folder), exist_ok=True)

        main_file = os.path.join(root, "app", "main.py")

        if not os.path.exists(main_file):
            with open(main_file, "w", encoding="utf-8") as f:
                f.write(self._fastapi_main_template())

    def _fastapi_main_template(self) -> str:
        return """from fastapi import FastAPI

app = FastAPI(title="AI Generated Backend")

@app.get("/")
def root():
    return {"message": "Backend is running successfully"}
"""
