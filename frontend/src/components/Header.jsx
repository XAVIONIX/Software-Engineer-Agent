import React from 'react';
import { Download, Settings, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="transition-theme bg-surface border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Xavionix</div>
        <div className="text-lg text-muted-foreground font-medium">AI Software Engineer V2</div>
        <div className="flex items-center space-x-2 ml-4">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Building</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="transition-theme bg-primary hover:bg-opacity-90 text-primary-foreground px-4 py-2 rounded-lg flex items-center space-x-2 font-medium">
          <Download size={16} />
          <span>Export Project</span>
        </button>
        
        <button 
          onClick={toggleTheme}
          className="transition-theme p-2 hover:bg-surface-light rounded-lg text-foreground"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="transition-theme p-2 hover:bg-surface-light rounded-lg text-foreground">
          <Settings size={20} />
        </button>
        <button className="transition-theme p-2 hover:bg-surface-light rounded-lg text-foreground">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
