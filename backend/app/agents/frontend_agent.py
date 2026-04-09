import os
from typing import Dict, Any
from app.agents.base import BaseAgent


class FrontendAgent(BaseAgent):
    name = "FrontendAgent"

    def execute(self, task: str, context: Dict[str, Any]) -> Dict[str, Any]:
        project_root = context.get("project_root", "generated_project/frontend")

        os.makedirs(project_root, exist_ok=True)

        if "frontend" in task.lower() or "ui" in task.lower():
            self._create_react_vite_structure(project_root)
            return {
                "status": "success",
                "message": "React (Vite) frontend scaffold created",
                "path": project_root
            }

        return {
            "status": "ignored",
            "message": f"Task not handled by FrontendAgent: {task}"
        }

    def _create_react_vite_structure(self, root: str):
        os.makedirs(os.path.join(root, "src"), exist_ok=True)

        files = {
            "package.json": self._package_json(),
            "index.html": self._index_html(),
            "src/main.jsx": self._main_jsx(),
            "src/App.jsx": self._app_jsx()
        }

        for path, content in files.items():
            full_path = os.path.join(root, path)
            if not os.path.exists(full_path):
                with open(full_path, "w", encoding="utf-8") as f:
                    f.write(content)

    def _package_json(self) -> str:
        return """{
  "name": "ai-generated-frontend",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}
"""

    def _index_html(self) -> str:
        return """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>AI Generated App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
"""

    def _main_jsx(self) -> str:
        return """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
"""

    def _app_jsx(self) -> str:
        return """function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>🚀 AI Software Engineer v2</h1>
      <p>Frontend generated successfully.</p>
    </div>
  )
}

export default App
"""
