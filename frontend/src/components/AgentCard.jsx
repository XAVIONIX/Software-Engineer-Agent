import React from 'react';
import { Brain, Cog, User, Database, Code, Shield, Eye, Server, CheckCircle, Search } from 'lucide-react';

const agentIcons = {
  'Orchestrator': Brain,
  'Project Manager': Cog,
  'Planner': User,
  'Frontend Engineer': Code,
  'Backend Engineer': Server,
  'Database Designer': Database,
  'Integrator': Cog,
  'DevOps': Server,
  'QA Tester': CheckCircle,
  'Code Reviewer': Search,
  'UI/UX Designer': Eye,
};

const statusColors = {
  idle: 'bg-gray-500',
  thinking: 'bg-yellow-500',
  working: 'bg-blue-500',
  reviewing: 'bg-green-500',
};

const AgentCard = ({ agent, isSelected, onClick }) => {
  const Icon = agentIcons[agent.name] || Brain;

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-900/20'
          : 'border-gray-600 bg-gray-700/50 hover:bg-gray-700'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <Icon size={20} className="text-white" />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${statusColors[agent.status]}`}></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white truncate">{agent.name}</div>
          <div className="text-xs text-gray-400 capitalize">{agent.status}</div>
          <div className="text-xs text-gray-500 truncate">{agent.lastAction}</div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;