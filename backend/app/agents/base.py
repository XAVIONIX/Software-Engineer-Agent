from abc import ABC, abstractmethod
from typing import Dict, Any


class BaseAgent(ABC):
    """
    Base class for all agents.
    Every agent MUST implement execute().
    """

    name: str = "BaseAgent"

    @abstractmethod
    def execute(self, task: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute a task and return structured output.
        """
        pass
