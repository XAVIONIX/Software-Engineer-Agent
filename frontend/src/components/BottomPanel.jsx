import React from 'react';
import { Code, Server, Database, Folder } from 'lucide-react';

const BottomPanel = ({ activeTab, onTabChange, code }) => {
  const tabs = [
    { id: 'frontend-code', label: 'Frontend', icon: Code },
    { id: 'backend-code', label: 'Backend', icon: Server },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'files', label: 'Files', icon: Folder },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'frontend-code':
        return (
          <div className="h-full flex">
            <div className="transition-theme w-48 bg-surface border-r border-border p-2">
              <div className="text-sm text-muted-foreground mb-2">src/components/</div>
              <div className="space-y-1 text-sm">
                <div className="text-primary font-medium">App.jsx</div>
                <div className="text-primary font-medium">Header.jsx</div>
                <div className="text-primary font-medium">Sidebar.jsx</div>
              </div>
            </div>
            <div className="transition-theme flex-1 bg-background p-4">
              <pre className="text-success text-sm overflow-x-auto">
                <code>{code.frontend}</code>
              </pre>
            </div>
          </div>
        );
      case 'backend-code':
        return (
          <div className="h-full flex">
            <div className="transition-theme w-48 bg-surface border-r border-border p-2">
              <div className="text-sm text-muted-foreground mb-2">app/</div>
              <div className="space-y-1 text-sm">
                <div className="text-primary font-medium">main.py</div>
                <div className="text-primary font-medium">api/</div>
                <div className="text-primary font-medium">services/</div>
              </div>
            </div>
            <div className="transition-theme flex-1 bg-background p-4">
              <pre className="text-success text-sm overflow-x-auto">
                <code>{code.backend}</code>
              </pre>
            </div>
          </div>
        );
      case 'database':
        return (
          <div className="p-4">
            <pre className="text-warning text-sm">
              <code>{code.database}</code>
            </pre>
          </div>
        );
      case 'files':
        return (
          <div className="p-4">
            <div className="text-muted-foreground">File structure would be displayed here</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="transition-theme h-96 bg-card border-t border-border flex flex-col">
      {/* Tabs */}
      <div className="transition-theme flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`transition-theme flex-1 flex items-center justify-center py-2 px-4 font-medium ${
              activeTab === tab.id
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-surface-light'
            }`}
          >
            <tab.icon size={16} className="mr-2" />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default BottomPanel;
