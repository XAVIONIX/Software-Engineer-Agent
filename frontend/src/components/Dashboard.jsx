import React from 'react';
import { Rocket, Activity, Grid, Zap, Layers } from 'lucide-react';

const statusPill = (status) => {
  const base = 'inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ';
  if (status === 'In progress') return `${base} transition-theme bg-primary/15 text-primary`;
  if (status === 'Reviewing') return `${base} transition-theme bg-success/15 text-success`;
  if (status === 'Pending') return `${base} transition-theme bg-warning/15 text-warning`;
  return `${base} transition-theme bg-muted/15 text-muted-foreground`;
};

const Dashboard = ({ agents, projects, summary }) => {
  return (
    <div className="transition-theme flex-1 overflow-y-auto bg-background px-6 py-6">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="transition-theme rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/70">Executive Command Center</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">AI Engineering Operations</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Monitor live projects, agent utilization, and platform performance in a premium AI development command workspace.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:w-[380px]">
              <div className="transition-theme rounded-xl bg-surface p-4 border border-border">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Live status</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-2 text-sm font-semibold text-success">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Building
                </div>
              </div>
              <div className="transition-theme rounded-xl bg-surface p-4 border border-border">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Agent team</p>
                <div className="mt-3 text-3xl font-semibold text-foreground">{agents.length}</div>
                <p className="mt-1 text-sm text-muted-foreground">AI roles active in the mission</p>
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
              <div key={item.label} className="transition-theme rounded-xl bg-surface p-5 border border-border">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <item.icon size={18} />
                  <span className="text-xs uppercase tracking-[0.3em]">{item.label}</span>
                </div>
                <div className="mt-4 text-3xl font-semibold text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.75fr_1fr]">
          <div className="transition-theme rounded-2xl border border-border bg-card p-6 shadow-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Project pipeline</p>
                <h2 className="mt-2 text-3xl font-semibold text-foreground">Ongoing initiatives</h2>
              </div>
              <span className="transition-theme inline-flex rounded-full bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground border border-border">
                {projects.length} active
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {projects.map((project) => (
                <div key={project.id} className="transition-theme rounded-xl border border-border bg-surface p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-[0.35em] text-primary/70">{project.category}</div>
                      <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                      <p className="max-w-2xl text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="space-y-2 text-right">
                      <span className={statusPill(project.status)}>{project.status}</span>
                      <p className="text-sm text-muted-foreground">Due {project.due}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{project.progress}% complete</span>
                      <span>{project.team}</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-border">
                      <div className="h-2 rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="transition-theme rounded-2xl border border-border bg-card p-6 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Platform summary</p>
                  <h2 className="mt-2 text-2xl font-semibold text-foreground">Usage & velocity</h2>
                </div>
                <div className="transition-theme rounded-full bg-surface px-3 py-1 text-xs uppercase tracking-[0.35em] text-muted-foreground border border-border">
                  Live update
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="transition-theme rounded-xl bg-surface p-5 border border-border">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Active users</p>
                  <p className="mt-3 text-3xl font-semibold text-foreground">{summary.activeUsers}</p>
                </div>
                <div className="transition-theme rounded-xl bg-surface p-5 border border-border">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">API requests / hour</p>
                  <p className="mt-3 text-3xl font-semibold text-foreground">{summary.apiRequests}</p>
                </div>
                <div className="transition-theme rounded-xl bg-surface p-5 border border-border">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Design reviews</p>
                  <p className="mt-3 text-3xl font-semibold text-foreground">{summary.reviewsToday}</p>
                </div>
              </div>
            </div>

            <div className="transition-theme rounded-2xl border border-border bg-card p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <Layers size={20} className="text-primary" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Agent health</p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">Team readiness</h3>
                </div>
              </div>
              <div className="mt-5 grid gap-4">
                <div className="transition-theme rounded-xl bg-surface p-4 border border-border">
                  <p className="text-sm text-muted-foreground">Active agents</p>
                  <p className="mt-3 text-2xl font-semibold text-foreground">{agents.filter((agent) => agent.status !== 'idle').length}</p>
                </div>
                <div className="transition-theme rounded-xl bg-surface p-4 border border-border">
                  <p className="text-sm text-muted-foreground">Idle agents</p>
                  <p className="mt-3 text-2xl font-semibold text-foreground">{agents.filter((agent) => agent.status === 'idle').length}</p>
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
