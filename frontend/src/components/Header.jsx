import React from 'react';
import { Download, Settings, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-blue-400">Xavionix</div>
        <div className="text-lg text-gray-300">AI Software Engineer V2</div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Building</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Download size={16} />
          <span>Export Project</span>
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Settings size={20} />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;