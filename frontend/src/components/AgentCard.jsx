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
  idle: 'bg-muted-foreground',
  thinking: 'bg-warning',
  working: 'bg-primary',
  reviewing: 'bg-success',
};

const AgentCard = ({ agent, isSelected, onClick }) => {
  const Icon = agentIcons[agent.name] || Brain;

  return (
    <div
      onClick={onClick}
      className={`transition-theme p-3 rounded-lg border cursor-pointer font-medium ${
        isSelected
          ? 'border-primary/50 bg-primary/10'
          : 'border-border bg-surface/50 hover:bg-surface-light'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="transition-theme w-10 h-10 bg-surface rounded-full flex items-center justify-center border border-border">
            <Icon size={20} className="text-foreground" />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${statusColors[agent.status]} animate-pulse`}></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground truncate">{agent.name}</div>
          <div className="text-xs text-muted-foreground capitalize">{agent.status}</div>
          <div className="text-xs text-muted-foreground/70 truncate">{agent.lastAction}</div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
