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
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="text-gray-800">
                <h3 className="font-bold mb-2">Generated UI Component</h3>
                <div className="border rounded p-2 bg-gray-50">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">Sample Button</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'app-preview':
        return (
          <div className="p-4">
            <div className="bg-gray-800 rounded-lg p-4 border">
              <div className="text-center text-gray-400">
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
            <div className="text-center text-gray-400">
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
                <div key={index} className="bg-gray-800 p-2 rounded">
                  <span className="text-gray-400">[{log.timestamp}]</span>
                  <span className="text-blue-400 ml-2">{log.agent}:</span>
                  <span className="text-white ml-2">{log.message}</span>
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
    <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center py-3 px-2 transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
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