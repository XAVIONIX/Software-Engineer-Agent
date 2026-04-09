import React from 'react';
import { Eye, Monitor, FileText, Activity } from 'lucide-react';

const RightPanel = ({ activeTab, onTabChange, logs }) => {
  const tabs = [
    { id: 'ui-preview', label: 'UI Preview', icon: Eye },
    { id: 'app-preview', label: 'App Preview', icon: Monitor },
    { id: 'architecture', label: 'Architecture', icon: FileText },
    { id: 'logs', label: 'Agent Logs', icon: Activity },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'ui-preview':
        return (
          <div className="p-4">
            <div className="transition-theme bg-card rounded-lg p-4 mb-4 border border-border">
              <div className="text-foreground">
                <h3 className="font-bold mb-2">Generated UI Component</h3>
                <div className="transition-theme border border-border rounded p-2 bg-surface">
                  <button className="transition-theme bg-primary text-primary-foreground px-4 py-2 rounded font-medium">Sample Button</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'app-preview':
        return (
          <div className="p-4">
            <div className="transition-theme bg-surface rounded-lg p-4 border border-border">
              <div className="text-center text-muted-foreground">
                <Monitor size={48} className="mx-auto mb-2" />
                <p>App Preview Simulation</p>
                <p className="text-sm">Running application would appear here</p>
              </div>
            </div>
          </div>
        );
      case 'architecture':
        return (
          <div className="p-4">
            <div className="text-center text-muted-foreground">
              <FileText size={48} className="mx-auto mb-2" />
              <p>System Architecture Diagram</p>
            </div>
          </div>
        );
      case 'logs':
        return (
          <div className="p-4">
            <div className="space-y-2 font-mono text-sm">
              {logs.map((log, index) => (
                <div key={index} className="transition-theme bg-surface p-2 rounded border border-border">
                  <span className="text-muted-foreground">[{log.timestamp}]</span>
                  <span className="text-primary ml-2 font-medium">{log.agent}:</span>
                  <span className="text-foreground ml-2">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="transition-theme w-96 bg-card border-l border-border flex flex-col">
      {/* Tabs */}
      <div className="transition-theme flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`transition-theme flex-1 flex flex-col items-center py-3 px-2 font-medium ${
              activeTab === tab.id
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-surface-light'
            }`}
          >
            <tab.icon size={20} />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default RightPanel;
