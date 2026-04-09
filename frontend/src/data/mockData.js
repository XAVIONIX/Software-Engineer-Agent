export const mockAgents = [
  {
    id: 1,
    name: 'Orchestrator',
    status: 'working',
    lastAction: 'Coordinating tasks',
  },
  {
    id: 2,
    name: 'Project Manager',
    status: 'thinking',
    lastAction: 'Planning sprint',
  },
  {
    id: 3,
    name: 'Planner',
    status: 'idle',
    lastAction: 'Task breakdown complete',
  },
  {
    id: 4,
    name: 'Frontend Engineer',
    status: 'working',
    lastAction: 'Building components',
  },
  {
    id: 5,
    name: 'Backend Engineer',
    status: 'reviewing',
    lastAction: 'API implementation',
  },
  {
    id: 6,
    name: 'Database Designer',
    status: 'idle',
    lastAction: 'Schema optimized',
  },
  {
    id: 7,
    name: 'Integrator',
    status: 'thinking',
    lastAction: 'Testing integration',
  },
  {
    id: 8,
    name: 'DevOps',
    status: 'idle',
    lastAction: 'Deployment ready',
  },
  {
    id: 9,
    name: 'QA Tester',
    status: 'working',
    lastAction: 'Running tests',
  },
  {
    id: 10,
    name: 'Code Reviewer',
    status: 'reviewing',
    lastAction: 'Code review in progress',
  },
  {
    id: 11,
    name: 'UI/UX Designer',
    status: 'thinking',
    lastAction: 'Designing interface',
  },
];

export const mockMessages = [
  {
    id: 1,
    agent: 'Orchestrator',
    content: 'Welcome! I\'m coordinating our AI development team. What would you like to build?',
    timestamp: new Date(Date.now() - 300000),
    type: 'agent',
  },
  {
    id: 2,
    agent: 'User',
    content: 'I need a React dashboard with user management',
    timestamp: new Date(Date.now() - 240000),
    type: 'user',
  },
  {
    id: 3,
    agent: 'Planner',
    content: 'Breaking down requirements: Authentication, User CRUD, Dashboard layout',
    timestamp: new Date(Date.now() - 180000),
    type: 'agent',
  },
  {
    id: 4,
    agent: 'Frontend Engineer',
    content: 'Starting with the login component and routing setup',
    timestamp: new Date(Date.now() - 120000),
    type: 'agent',
  },
  {
    id: 5,
    agent: 'Backend Engineer',
    content: 'Designing REST API endpoints for user management',
    timestamp: new Date(Date.now() - 60000),
    type: 'agent',
  },
];

export const mockCode = {
  frontend: `import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <div className="user-list">
        {/* User management components */}
      </div>
    </div>
  );
};

export default Dashboard;`,
  backend: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

@app.post("/users/")
async def create_user(user: User):
    return {"message": "User created", "user": user}`,
  database: `-- User table schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
};

export const mockProjects = [
  {
    id: 1,
    name: 'Xavionix Core AI Dashboard',
    category: 'Platform Intelligence',
    description: 'Designing the executive dashboard for AI orchestration, usage monitoring, and real-time project tracking.',
    status: 'In progress',
    progress: 82,
    due: 'Apr 18',
    team: 'Frontend + UX',
  },
  {
    id: 2,
    name: 'API Collaboration Engine',
    category: 'Backend Services',
    description: 'Building the orchestration API and event bus for agent communication and structured deliverables.',
    status: 'Reviewing',
    progress: 69,
    due: 'Apr 22',
    team: 'Backend + DevOps',
  },
  {
    id: 3,
    name: 'QA Automation Pipeline',
    category: 'Testing',
    description: 'Implementing continuous validation and intelligent issue detection across the workflow.',
    status: 'Pending',
    progress: 46,
    due: 'Apr 25',
    team: 'QA + Integrator',
  },
  {
    id: 4,
    name: 'Design System Library',
    category: 'UX / Visual',
    description: 'Finalizing reusable interface components, motion tokens, and premium styling standards.',
    status: 'In progress',
    progress: 77,
    due: 'Apr 20',
    team: 'UI/UX + Frontend',
  },
];

export const mockSummary = {
  activeProjects: 4,
  agentUtilization: 78,
  tasksCompleted: 128,
  systemUptime: '99.98%',
  activeUsers: 314,
  apiRequests: '18k',
  reviewsToday: 12,
};

export const mockLogs = [
  {
    timestamp: '14:32:15',
    agent: 'Orchestrator',
    message: 'Task assigned to Frontend Engineer',
  },
  {
    timestamp: '14:32:10',
    agent: 'Frontend Engineer',
    message: 'Component created successfully',
  },
  {
    timestamp: '14:32:05',
    agent: 'Backend Engineer',
    message: 'API endpoint implemented',
  },
  {
    timestamp: '14:32:00',
    agent: 'QA Tester',
    message: 'Test suite passed',
  },
];