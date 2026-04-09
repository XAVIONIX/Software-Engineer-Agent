import React from 'react';
import { Rocket, Activity, Grid, Zap, Layers } from 'lucide-react';

const statusPill = (status) => {
  const base = 'inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ';
  if (status === 'In progress') return `${base} bg-blue-500/15 text-blue-200`;
  if (status === 'Reviewing') return `${base} bg-emerald-500/15 text-emerald-200`;
  if (status === 'Pending') return `${base} bg-amber-500/15 text-amber-200`;
  return `${base} bg-slate-600/15 text-slate-200`;
};

const Dashboard = ({ agents, projects, summary }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 px-6 py-6">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/90 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.35em] text-sky-300/70">Executive Command Center</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">AI Engineering Operations</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Monitor live projects, agent utilization, and platform performance in a premium AI development command workspace.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:w-[380px]">
              <div className="rounded-3xl bg-slate-900/80 p-4 border border-white/10">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Live status</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Building
                </div>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4 border border-white/10">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Agent team</p>
                <div className="mt-3 text-3xl font-semibold text-white">{agents.length}</div>
                <p className="mt-1 text-sm text-slate-400">AI roles active in the mission</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Active projects', value: summary.activeProjects, icon: Rocket },
              { label: 'Agent utilization', value: `${summary.agentUtilization}%`, icon: Activity },
              { label: 'Tasks completed', value: summary.tasksCompleted, icon: Grid },
              { label: 'System uptime', value: summary.systemUptime, icon: Zap },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-slate-900/80 p-5 border border-white/10">
                <div className="flex items-center gap-3 text-slate-400">
                  <item.icon size={18} />
                  <span className="text-xs uppercase tracking-[0.3em]">{item.label}</span>
                </div>
                <div className="mt-4 text-3xl font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.75fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-black/20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Project pipeline</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Ongoing initiatives</h2>
              </div>
              <span className="inline-flex rounded-full bg-slate-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 border border-white/10">
                {projects.length} active
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {projects.map((project) => (
                <div key={project.id} className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5 shadow-inner shadow-black/20">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-[0.35em] text-sky-300/70">{project.category}</div>
                      <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                      <p className="max-w-2xl text-sm text-slate-400">{project.description}</p>
                    </div>
                    <div className="space-y-2 text-right">
                      <span className={statusPill(project.status)}>{project.status}</span>
                      <p className="text-sm text-slate-400">Due {project.due}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>{project.progress}% complete</span>
                      <span>{project.team}</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-black/20">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Platform summary</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Usage & velocity</h2>
                </div>
                <div className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300 border border-white/10">
                  Live update
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-slate-900/80 p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Active users</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{summary.activeUsers}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">API requests / hour</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{summary.apiRequests}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Design reviews</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{summary.reviewsToday}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-black/20">
              <div className="flex items-center gap-3">
                <Layers size={20} className="text-sky-300" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Agent health</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Team readiness</h3>
                </div>
              </div>
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl bg-slate-900/80 p-4 border border-white/10">
                  <p className="text-sm text-slate-400">Active agents</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{agents.filter((agent) => agent.status !== 'idle').length}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4 border border-white/10">
                  <p className="text-sm text-slate-400">Idle agents</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{agents.filter((agent) => agent.status === 'idle').length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
