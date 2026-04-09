class TaskPlanner:
    def create_plan(self, intent: str, user_input: str):
        intent = intent.upper().strip()

        if intent == "BUILD":
            return [
                "Gather requirements",
                "Select technology stack",
                "Design UI/UX",
                "Develop frontend",
                "Develop backend",
                "Integrate APIs",
                "Testing",
                "Deployment"
            ]

        elif intent == "EDIT":
            return [
                "Identify files to modify",
                "Understand existing logic",
                "Implement requested changes",
                "Test changes",
                "Update documentation"
            ]

        elif intent == "FIX":
            return [
                "Reproduce the issue",
                "Identify root cause",
                "Fix the bug",
                "Write tests",
                "Verify fix"
            ]

        else:
            return ["No planning required"]
