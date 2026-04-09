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
            <div className="w-48 bg-gray-800 border-r border-gray-700 p-2">
              <div className="text-sm text-gray-400 mb-2">src/components/</div>
              <div className="space-y-1 text-sm">
                <div className="text-blue-400">App.jsx</div>
                <div className="text-blue-400">Header.jsx</div>
                <div className="text-blue-400">Sidebar.jsx</div>
              </div>
            </div>
            <div className="flex-1 bg-gray-900 p-4">
              <pre className="text-green-400 text-sm overflow-x-auto">
                <code>{code.frontend}</code>
              </pre>
            </div>
          </div>
        );
      case 'backend-code':
        return (
          <div className="h-full flex">
            <div className="w-48 bg-gray-800 border-r border-gray-700 p-2">
              <div className="text-sm text-gray-400 mb-2">app/</div>
              <div className="space-y-1 text-sm">
                <div className="text-blue-400">main.py</div>
                <div className="text-blue-400">api/</div>
                <div className="text-blue-400">services/</div>
              </div>
            </div>
            <div className="flex-1 bg-gray-900 p-4">
              <pre className="text-green-400 text-sm overflow-x-auto">
                <code>{code.backend}</code>
              </pre>
            </div>
          </div>
        );
      case 'database':
        return (
          <div className="p-4">
            <pre className="text-yellow-400 text-sm">
              <code>{code.database}</code>
            </pre>
          </div>
        );
      case 'files':
        return (
          <div className="p-4">
            <div className="text-gray-400">File structure would be displayed here</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-96 bg-gray-800 border-t border-gray-700 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center py-2 px-4 transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
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