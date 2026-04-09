import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

const RoundTableView = ({ agents, messages, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Position agents in a circle
  const getAgentPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 200;
    const centerX = 400;
    const centerY = 300;

    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  return (
    <div className="transition-theme flex-1 bg-background relative overflow-hidden">
      {/* Round Table Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="transition-theme w-[600px] h-[600px] border-2 border-border rounded-full relative">
          {/* Agent Positions */}
          {agents.map((agent, index) => {
            const pos = getAgentPosition(index, agents.length);
            return (
              <div
                key={agent.id}
                className={`transition-theme absolute w-16 h-16 rounded-full flex items-center justify-center ${
                  agent.status === 'thinking' || agent.status === 'working'
                    ? 'ring-4 ring-primary animate-pulse'
                    : 'ring-2 ring-border'
                }`}
                style={{
                  left: pos.x - 32,
                  top: pos.y - 32,
                  backgroundColor: agent.status === 'idle' ? 'var(--muted)' : 'var(--primary)',
                }}
              >
                <span className="text-xs font-bold text-foreground">{agent.name.charAt(0)}</span>
              </div>
            );
          })}

          {/* Center Orchestrator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="transition-theme w-20 h-20 bg-primary rounded-full flex items-center justify-center ring-4 ring-primary/50 animate-pulse border border-primary">
              <span className="text-lg font-bold text-primary-foreground">O</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Panel */}
      <div className="transition-theme absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm border-t border-border">
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default RoundTableView;
