import React, { useState } from 'react';
import { Home, Folder, Clock, History, Users, MessageCircle, ShieldCheck } from 'lucide-react';
import AgentCard from './AgentCard';

const Sidebar = ({ agents, selectedAgent, onAgentSelect, onChatToggle }) => {
  const [activeTab, setActiveTab] = useState('Agents');

  const navItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Folder, label: 'Projects' },
    { icon: Clock, label: 'Active Session' },
    { icon: History, label: 'History' },
    { icon: Users, label: 'Agents' },
  ];

  const activeCount = agents.filter((agent) => agent.status !== 'idle').length;

  return (
    <div className="transition-theme w-[320px] flex-shrink-0 bg-surface border-r border-border flex flex-col shadow-lg">
      <div className="transition-theme px-6 py-5 border-b border-border bg-surface backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Team Console</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Agent Roster</h2>
          </div>
          <div className="transition-theme rounded-2xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary border border-primary/20">
            Live
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">A professional overview of every AI role and their current workload.</p>
      </div>

      <div className="px-4 py-4 space-y-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`transition-theme w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left font-medium ${
              activeTab === item.label
                ? 'bg-primary/10 border border-primary/20 text-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-surface-light hover:text-foreground'
            }`}
          >
            <item.icon size={18} />
            <div className="flex-1">
              <div className="text-sm">{item.label}</div>
            </div>
            {item.label === 'Agents' && (
              <span className="transition-theme rounded-full bg-primary/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">{activeCount} active</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden px-4 pb-4">
        <div className="h-full overflow-y-auto pr-2">
          <div className="transition-theme mb-4 rounded-2xl border border-border bg-surface-light/50 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Connected Agents</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Track current agent status, handoffs, and direct communication from one single tab.
            </p>
          </div>

          {activeTab === 'Agents' ? (
            <div className="space-y-3 pb-6">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  isSelected={selectedAgent?.id === agent.id}
                  onClick={() => onAgentSelect(agent)}
                />
              ))}
            </div>
          ) : (
            <div className="transition-theme rounded-2xl border border-border bg-surface-light/50 p-5 text-muted-foreground">
              <p className="text-sm leading-relaxed">
                Switch to <span className="font-semibold text-foreground">Agents</span> to manage the active AI roles and watch the team pulse.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-5">
        <div className="transition-theme rounded-2xl border border-border bg-gradient-to-br from-surface-light to-surface p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Team pulse</span>
            <ShieldCheck size={16} />
          </div>
          <div className="mt-4 grid gap-3">
            <div className="transition-theme rounded-xl bg-card p-3 border border-border">
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">Active agents</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{activeCount}</p>
            </div>
            <div className="transition-theme rounded-xl bg-card p-3 border border-border">
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">Total roles</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{agents.length}</p>
            </div>
          </div>
          <button
            onClick={onChatToggle}
            className="transition-theme mt-4 w-full rounded-lg bg-primary hover:opacity-90 text-primary-foreground px-4 py-3 text-sm font-semibold"
          >
            Open Agent Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
