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
    <div className="w-[320px] flex-shrink-0 bg-slate-950 border-r border-white/10 flex flex-col shadow-2xl shadow-black/20">
      <div className="px-6 py-5 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Team Console</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Agent Roster</h2>
          </div>
          <div className="rounded-2xl bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-200 border border-blue-500/20">
            Live
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-400">A professional overview of every AI role and their current workload.</p>
      </div>

      <div className="px-4 py-4 space-y-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`w-full flex items-center gap-3 rounded-3xl px-4 py-3 text-left transition-all ${
              activeTab === item.label
                ? 'bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 border border-blue-500/20 text-white shadow-lg shadow-blue-500/5'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <item.icon size={18} className="text-slate-400" />
            <div className="flex-1">
              <div className="text-sm font-medium">{item.label}</div>
            </div>
            {item.label === 'Agents' && (
              <span className="rounded-full bg-blue-500/15 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-200">{activeCount} active</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden px-4 pb-4">
        <div className="h-full overflow-y-auto pr-2">
          <div className="mb-4 rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-inner shadow-black/10">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Connected Agents</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
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
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-slate-300">
              <p className="text-sm leading-relaxed">
                Switch to <span className="font-semibold text-white">Agents</span> to manage the active AI roles and watch the team pulse.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-5">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950/70 to-slate-900/90 p-4">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Team pulse</span>
            <ShieldCheck size={16} className="text-slate-300" />
          </div>
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl bg-slate-950/80 p-3 border border-white/10">
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Active agents</p>
              <p className="mt-2 text-2xl font-semibold text-white">{activeCount}</p>
            </div>
            <div className="rounded-2xl bg-slate-950/80 p-3 border border-white/10">
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Total roles</p>
              <p className="mt-2 text-2xl font-semibold text-white">{agents.length}</p>
            </div>
          </div>
          <button
            onClick={onChatToggle}
            className="mt-4 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Open Agent Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
