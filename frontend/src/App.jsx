import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatPanel from './components/ChatPanel';
import { mockAgents, mockMessages, mockProjects, mockSummary } from './data/mockData';

function AppContent() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [messages, setMessages] = useState(mockMessages);
  const [agents, setAgents] = useState(mockAgents);
  const [projects, setProjects] = useState(mockProjects);
  const [summary] = useState(mockSummary);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Simulate agent activity
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prevAgents =>
        prevAgents.map(agent => ({
          ...agent,
          status: Math.random() > 0.7 ? 'thinking' : agent.status,
          lastAction: Math.random() > 0.8 ? `Updated ${new Date().toLocaleTimeString()}` : agent.lastAction
        }))
      );

      // Add random messages
      if (Math.random() > 0.9) {
        const randomAgent = mockAgents[Math.floor(Math.random() * mockAgents.length)];
        const newMessage = {
          id: Date.now(),
          agent: randomAgent.name,
          content: `Agent ${randomAgent.name} is working on task...`,
          timestamp: new Date(),
          type: 'agent'
        };
        setMessages(prev => [...prev, newMessage]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now(),
      agent: 'User',
      content,
      timestamp: new Date(),
      type: 'user'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="transition-theme h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          agents={agents}
          selectedAgent={selectedAgent}
          onAgentSelect={setSelectedAgent}
          onChatToggle={() => setIsChatOpen(!isChatOpen)}
        />
        <div className="flex-1 overflow-hidden">
          <Dashboard agents={agents} projects={projects} summary={summary} />
        </div>
      </div>
      {isChatOpen && (
        <ChatPanel
          selectedAgent={selectedAgent}
          messages={messages.filter(m => !selectedAgent || m.agent === selectedAgent.name)}
          onSendMessage={handleSendMessage}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
